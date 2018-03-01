'use strict'

require('console.table')
const AWS = require('aws-sdk')
const query = require('array-query')

const findOwner = (tags) => {
  let owner
  let ownerQuery = query('Key').is('Owner').on(tags)
  if (ownerQuery.length === 0) { return owner = 'unknown' }
  else { return owner = ownerQuery[0].Value }
}

const parseInstances = (reservations) => {
  let output = []
  reservations.forEach((reservation) => {
    reservation.Instances.forEach((instance) => {
      let instanceDetails = {
        InstanceId: instance.InstanceId,
        Owner: findOwner(instance.Tags),
        InstanceType: instance.InstanceType,
        LaunchTime: instance.LaunchTime
      }
      output.push(instanceDetails)
    })
  })
  return output.sort(ownerSort)
}

const ownerSort = (a, b) => {
  let comparison = 0
  if (a.Owner.toLowerCase() > b.Owner.toLowerCase()) {
    comparison = 1
  } else if (a.Owner.toLowerCase() < b.Owner.toLowerCase()) {
    comparison = -1
  }
  return comparison
}

const getInstances = (region) => {
  if (AWS.config.credentials.SharedIniFileCredentials == 'undefined') {
    return console.log('Please configure your AWS credentials file')
  }

  AWS.config.region = region
  let ec2 = new AWS.EC2()
  ec2.describeInstances((err, data) => {
    if (err) { return console.log(err) }
    let instances = parseInstances(data.Reservations)

    if (instances.length === 0) { console.log(`No instances found in ${region}`) } 
    else { return console.table(parseInstances(data.Reservations)) }
  })
}

module.exports.list = (regionInput) => {
  let region
  if (!regionInput) { region = 'us-west-2' }
  else { region = regionInput }
  
  return getInstances(region)
}
