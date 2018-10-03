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
