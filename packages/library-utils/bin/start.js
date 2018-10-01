'use strict'
const {spawn} = require('child_process')
const {clearConsole} = require('./utils.js')
const chalk = require('chalk')

function spawnStorybook(port) {
  const cp = spawn('start-storybook', ['-p', port, '-c', '.storybook'])
  return cp
}

/**
 * Starts the storybook dev server
 */
function startStorybook(port) {
  var app = spawnStorybook(port)
}

function spawnNodemon() {
  const cp = spawn(
    'nodemon',
    // $ nodemon -e '*' -w src -x 'rm .babelrc &> /dev/null; nwb build-react-component --no-demo --copy-files'
    [
      '--watch',
      'src',
      '-x',
      'rm .babelrc &> /dev/null; nwb build-react-component --no-demo --copy-files'
    ],
    {
      // the important part is the 4th option 'ipc'
      // this way `process.send` will be available in the child process (nodemon)
      // so it can communicate back with parent process (through `.on()`, `.send()`)
      // https://nodejs.org/api/child_process.html#child_process_options_stdio
      stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    }
  )

  return cp
}

/**
 * Starts a dev server
 * @param {string}  type  The servers type
 */
function startDev(type = 'default') {
  var app = spawnNodemon()
  // Generate a random port
  const port = '600' + Math.floor(Math.random() * 9 + 1)
  if (type === 'withStorybook') {
    startStorybook(port)
  }
  app.on('message', function(event) {
    if (event.type === 'boot') {
      clearConsole()
      type === 'withStorybook'
        ? console.log(
            chalk.cyan('Starting storybook and nodemon watcher...\u001b[39m')
          )
        : console.log(chalk.cyan('Starting nodemon watcher...\u001b[39m'))
    } else if (event.type === 'config:update') {
      console.log('Watching: ' + event.data.dirs[0])
    } else if (event.type === 'start') {
      console.log('⏳ Compiling...')
    } else if (event.type === 'crash') {
      console.log(chalk.red('Failed to compile. Waiting for changes...'))
    } else if (event.type === 'restart') {
      clearConsole()
      console.log(chalk.yellow('Changes detected:'))
      event.data.forEach(d => console.log('--> ' + d))
    } else if (event.type === 'exit') {
      clearConsole()
      type === 'withStorybook'
        ? console.log(
            chalk.green('Compiled successfully! Waiting for changes...') +
              '\n\n' +
              '📕 Storybook running on ' +
              'http://localhost:' +
              chalk.bold(port) +
              '/' +
              '\n\n' +
              'Please note that the output of the storyboard dev server is not logged. \nTo start a standalone storyboard server, use ' +
              chalk.cyan('yarn run storybook') +
              '.'
          )
        : console.log(
            chalk.green('Compiled successfully! Waiting for changes...')
          )
    } else {
      // console.log(event)
    }
  })
}
module.exports = {startDev}
