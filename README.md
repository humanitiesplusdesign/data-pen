# Fibra

## Building

### Prequisites

 1. Make sure you have [Node.js](https://nodejs.org/en/) installed (for example using [nvm](https://github.com/creationix/nvm)).
 1. Make sure you have [Bower](http://bower.io/) installed (`npm install -g bower`)
 1. Make sure you have [Webpack](https://webpack.js.org/) installed (`npm install -g webpack`)

### Setting up the build environment

Run the following commands in the folder where you want the `fibra` folder to be:

```shell
git clone https://github.com/humanitiesplusdesign/fibra.git
cd fibra
npm install
npm install -g webpack-dev-server
webpack-dev-server
```

Running `npm install` (or `yarn` if you have it) should also automatically run `bower install`, but if it doesn't, run that yourself.

### Building

To simply build the project, run `webpack`. However, when actually working, you probably want to use `webpack-dev-server` (which you need to install by `npm install -g webpack-dev-server` as mentioned above), which spawns the app on localhost:3000, and stays to watch for changes in the project files, automatically recompiling them. At the moment you still need to reload the browser to see changes, but we will eventually enable hot module loading so that they will be automatically updated with changes.

### Running completely against a local SPARQL endpoint

Install and run a SPARQL endpoint, for example [Fuseki](https://jena.apache.org/documentation/fuseki2/). Load into it some configurations, for example by loading the Turtle file at http://ldf.fi/fibra/sparql?graph=http://ldf.fi/fibra/shared-projects/ . You may want to rename the labels for the authorities and archives in order to distinguish them in the configure view, so you can make sure your project refers only to configurations always available on your localhost. In addition, you'll need to 1) load the schemas you are going to use into your local endpoint too (e.g. from http://ldf.fi/fibra/sparql?graph=http://ldf.fi/fibra/schemas/cidoc-crm/) and 2) alter the schema references in the configuration Turtle to point to them instead of the remote ones (at least <http://rdfs.org/ns/void#sparqlEndpoint> <http://localhost:3030/fibra/sparql> or equivalent).
