'use strict'
const {execFile} = require('child_process')
const {clearConsole, printDevServerInfo} = require('./utils.js')
const chalk = require('chalk')
const dirCommand = require('@babel/cli/lib/babel/dir.js').default
const parseArgv = require('@babel/cli/lib/babel/options.js').default
const path = require('path')

function spawnStyleguide(port) {
  const cp = execFile(
    require.resolve('react-styleguidist/bin/styleguidist.js'),
    ['server']
  )
  cp.stdout.on('data', function(data) {
    console.log(data.toString())
  })
  return cp
}

/**
 * Starts the styleguide dev server
 */
async function startStyleguide(port) {
  var app = spawnStyleguide()
}

/**
 * Starts a dev server
 * @param {string}  type  The servers type
 */
function startDev(type = 'default') {
  type === 'withStorybook'
    ? console.log(
        chalk.cyan('Starting styleguide and babel watcher...\u001b[39m')
      )
    : console.log(chalk.cyan('Starting babel watcher...\u001b[39m'))

  // Spawn Babel server
  process.env.NODE_ENV = 'development'
  const opts = parseArgv([
    process.argv[0],
    process.argv[1],
    '-w',
    '--presets=react-app',
    'src',
    '--out-dir',
    'es',
    '--copy-files',
    '--delete-dir-on-start',
    '--ignore',
    '__tests__,spec.js,test.js,__snapshots__'
  ])
  dirCommand(opts).catch(err => {
    console.error(err)
    process.exit(1)
  })
  if (type === 'withStorybook') {
    startStyleguide()
  }
  printDevServerInfo()
}
module.exports = {startDev}
