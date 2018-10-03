const chalk = require('chalk')

function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
  )
}
function printDevServerInfo() {
  clearConsole()
  console.log(chalk.green('Started watcher! Waiting for changes...'))

  console.log(
    '\nThe ' +
      chalk.bold('babel') +
      ' watcher does not provide proper console output after first compilation.\nPlease refer to the consuming applications dev server for error logging.'
  )
  console.log('\n')
}
module.exports = {
  clearConsole: clearConsole,
  printDevServerInfo: printDevServerInfo
}
