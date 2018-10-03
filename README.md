# cra-monorepo
This example repository demonstrates how to use create react app 2.x in a monorepo setup.

## What do we do?
### Libraries 
#### Compiling
Libraries are transpiled using `babel` and can be developed using `Styleguidist`. The package `library-utils` in this monorepo provide some basic configurations to make babel and Styleguidist work with create react app, CSS Modules, SASS, etc.

The **library-utils** package provides a babel based watcher service. Just use `library-utils build:watch` in your scrips.
E.g. 
```json
...
    "build:watch": "library-utils build:watch",
...
```
See example library in this repo for example.

When having multiple libraries in the monorepo you can now simply run `lerna exec -- yarn run build:watch` or `lerna run build:watch --parallel` to start a single terminal application that watches all the packages that have this script in their package.json.

#### Styleguidist
For starting a dev server that serves Styleguidist and the babel watcher, simply use `library-utils start` in your scrips.
E.g. 
```json
...
    "start": "library-utils start",,
...
```
See example library in this repo for example.

Now running `yarn start` or `npm run start` in your library stares a dev server that compiles your code on changes and provides a Styleguidist server.

### Create React App
The **cra-app** example create react app can now consume the libraries components (See **cra-app** in this repo for example). Changes to your library will now be transpiled imediatly when running the dev server / watcher. Assets like images ot css / scss files will be copied and finally picked up and bundeled by the create react app, that consumes the library. This is of course handeled by the dev server / watcher.

## Notes
This pattern is still in early stages and just meant as an example on how to handle create react app in a monorepo setup. Feel free to comment suggestions.
The implementation of Styleguidist seems to be a bit buggy at the moment and might compain it is not finding webpack. I am working on this.

Origin Issue: https://github.com/facebook/create-react-app/issues/5100#issuecomment-425395156
