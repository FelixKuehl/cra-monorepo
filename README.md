# cra-monorepo
This example repository demonstrates how to use create react app 2.x in a monorepo setup.

## What do we do?
### Libraries 
Libraries are bootstraped and transpiled using `nwb` and can be developed using `storybook`. The package `library-utils` in this monorepo provide some basic configurations to make nwb and storybook work with create react app, CSS Modules, SASS, etc.
A basic nwb configuration can be found at `library-utils/config/nwb.js`. So within a library in the monorepo just set your *nwb.config.js* to 
```js 
const config = require('library-utils/config/nwb.js')
// Customize config object as needed
module.export = config
```
The **library-utils** package provides a nodemon based watcher service. Just use `library-utils build:watch` in your scrips.
E.g. 
```json
...
    "build:watch": "library-utils build:watch",
...
```
See example library in this repo for example.

A basic webpack configuration for **Storybook**, working with CSS Modules, SASS, Fonts and Files (ES import and SASS/CSS @import) is also provided at `library-utils/config/storybook/webpack.config.js` so just set your **.storybook/webpack.config.js** to 
```js
const config = require('library-utils/config/storybook/webpack.config.js')
// Customize config object as needed
module.exports = config
```
For starting a dev server that serves storybook and the watcher, simply use `library-utils build:watch` in your scrips.
E.g. 
```json
...
    "start": "library-utils start",,
...
```
See example library in this repo for example.

Now running `yarn start` or `npm run start` in your library stares a dev server that compiles your code on changes and provides a storybook server.

### Create React App
The **cra-app** example create react app can now consume the libraries components (See **cra-app** in this repo for example). Changes to your library will now be transpiled imediatly when running the dev server / watcher. Assets like images ot css / scss files will be copied and finally picked up and bundeled by the create react app, that consumes the library. This is of course handeled by the dev server / watcher.

## Notes
This pattern is still in early stages and just meant as an example on how to handle create react app in a monorepo setup. Feel free to comment suggestions.

Origin Issue: https://github.com/facebook/create-react-app/issues/5100#issuecomment-425395156
