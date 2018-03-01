#!/usr/bin/env node

'use strict'

const app = require('commander')
const owners = require('./lib/list-instance-owners.js')

app
  .version('1.0.0')
  .option('-r, --region <region>', 'Region to list instances from')
  .option('-t, --tag <tag>', 'Tag to query. Default is Owner')
  .parse(process.argv)

owners.list(app.region, app.tag)
