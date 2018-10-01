#!/usr/bin/env node
'use strict'
const {startDev} = require('./start.js')
const chalk = require('chalk')

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

const args = process.argv.slice(2)

const scriptIndex = args.findIndex(x => x === 'build:watch' || x === 'start')
const script = scriptIndex === -1 ? args[0] : args[scriptIndex]
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []

switch (script) {
  case 'build:watch': {
    startDev()
    break
  }
  case 'start': {
    startDev('withStorybook')
    break
  }
  default:
    console.log(chalk.red('Unknown script "' + script + '".'))
    break
}
