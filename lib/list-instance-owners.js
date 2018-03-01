'use strict'

require('console.table')
const AWS = require('aws-sdk')
const query = require('array-query')

const findTag = (tags, query) => {
  let tagValue
  let tagQuery = query('Key').is(query).on(tags)
  if (tagQuery.length === 0) { return tagValue = 'unknown' }
  else { return tagValue = tagQuery[0].Value }
}

const parseInstances = (reservations, tagQuery) => {
  let output = []
  reservations.forEach((reservation) => {
    reservation.Instances.forEach((instance) => {
      let instanceDetails = {
        InstanceId: instance.InstanceId,
        Owner: findTag(instance.Tags),
        // InstanceType: instance.InstanceType,
        LaunchTime: instance.LaunchTime
      }
      instanceDetails[tagQuery] = findTag(instance.Tags, tagQuery)
      output.push(instanceDetails)
    })
  })
  return output.sort(tagSort)
}

const tagSort = (a, b) => {
  let comparison = 0
  if (a.Owner.toLowerCase() > b.Owner.toLowerCase()) {
    comparison = 1
  } else if (a.Owner.toLowerCase() < b.Owner.toLowerCase()) {
    comparison = -1
  }
  return comparison
}

const getInstances = (region, tagQuery) => {
  if (AWS.config.credentials === null) {
    return console.log('Please configure your AWS credentials file')
  }

  AWS.config.region = region
  let ec2 = new AWS.EC2()
  ec2.describeInstances((err, data) => {
    if (err) { return console.log(err) }
    let instances = parseInstances(data.Reservations, tagQuery)

    if (instances.length === 0) { console.log(`No instances found in ${region}`) }
    else { return console.table(instances) }
  })
}

module.exports.list = (regionInput, tagInput) => {
  let region
  let tag
  if (!regionInput) { region = 'us-west-2' }
  else { region = regionInput }
  
  if (!tagInput) { tag = 'Owner' }
  else { tag = tagInput }
  
  return getInstances(region, tag)
}
