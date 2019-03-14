# Socius

A web component library built with ![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)


## Table of content

1. [Stencil workflow](#stencil-workflow)
1. [Decorators](#decorators)
1. [Initial project setup](#initial-project-setup)
3. [JSDocs](#jSDocs)
4. [Stencil Component Starter Docs](#stencil-Component-Starter)


## Stencil workflow

```
npm start (http://localhost:3333/)
npm run units
npm run docs
npm test
npm run build
```

When running the app locally, often you have to do a hard reload to get changes in the styles to show up.


## Using the tabs

This is a work in progress.  To listen to a tab changed event outside of the component and react to it, use something like the following:
```
const tabs = document.querySelector('mtn-tabs');
tabs.addEventListener('change', event => {
  // You'll find your emitted object under event.detail
  console.log(`CHANGED TABS TO INDEX ${event.detail.tabId}`);
});
```


## HTML<name>Element

In the demo source, there is an element used, for example the tabs class:
```
State() tabs: HTMLFoliaTabElement[] = [];
```


*HTMLFoliaTabElement[]* is an interface that is created automatically by Stencil in the components.d.ts file. It provides intellisense for components, with the standard HTML element properties and methods, as well as those are defined in the component.


Just how do those get created?  When we do a build?  In the [third part](https://dev.to/johnwoodruff91/component-libraries-with-stenciljs---your-first-component-3b7p) of the component library tutorial, it just shows how to replace the my-component with mtn-button component using text replace.  At what point did the components.d.ts file get updated then?

Changing the library name and re-compiling added the Folia element.  Still it seems like there must be a CLI command to do this...


## Decorators

A brief description of the decorators offered by StencilJS.

* @State() decorator is used to manage data that is internal to the component.
* @Element() method returns an instance of the host HTMLElement of the component.
* @Method() decorator exposes class methods on the public API for the component.
* @Event()  can define an EventEmitter to emit [custom events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)
* @Listen() decorator - a shorthand way of listening to a DOM Event (ours or standard events such as the scroll event).
* @Watch() decorator for a specific property on the component class, and decorates a method which is called upon that property being changed.


## Initial project setup

If stencil is not installed, get the latest like this:
```
npm install @stencil/core@latest --save-exact
```

```
npm init stencil
```

change is the namespace in the stencil.config.ts file.
```
yarn add --dev @stencil/sass
```
```
npm add --save-dev @stencil/sass
```

I should have used *npm i* but let add run due to surprise that it was working.  What's the difference between install and add for npm?  Not sure.

Some problems at first:
```
[ts] Cannot find name 'require'. Do you need to install type definitions for node? Try `npm i @types/node`.
$ npm i @types/node
[ts] Cannot find name 'describe'.
$ npm install --save-dev @types/jasmine
[ts] Property 'toHaveClass' does not exist on type 'Matchers<E2EElement>'.
SO:  no help for this
```


First test run with button:
```
 PASS  src/components/my-component/my-component.spec.ts
 PASS  src/components/button/button.spec.ts
 FAIL  src/components/button/button.e2e.ts (16.59s)
  ● button › renders changes to the name data
    Evaluation failed: Error: shadow root does not exist for element: button
      at __puppeteer_evaluation_script__:3:2
      at ExecutionContext.evaluateHandle (node_modules/puppeteer/lib/ExecutionContext.js:106:13)
 PASS  src/components/my-component/my-component.e2e.ts (18.697s)
Test Suites: 1 failed, 3 passed, 4 total
Tests:       1 failed, 10 passed, 11 total
Snapshots:   0 total
Time:        20.191s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```

Next time running npm start, the console gets filled with errors like this:
```
"node_modules/@types/jasmine/index.d.ts, line 19, column 17↵Duplicate identifier 'describe'."
```

Had to add this to the tsconfig compilerOptions: ```"types": []```

The tests are not running on an older mac.
```
[26:59.0]  generate app files finished in 165 ms

[ ERROR ]  Timed out after 30000 ms while trying to connect to Chrome! The only Chrome revision guaranteed to work is r588429 TimeoutError: Timed out after 30000 ms while trying to connect to Chrome! The only Chrome revision guaranteed to work is r588429 at Timeout.onTimeout
(/Users/tim/repos/loranthifolia-teretifolia-curator/socius/node_modules/puppeteer/lib/Launcher.js:344:14) at
ontimeout (timers.js:466:11) at tryOnTimeout (timers.js:304:5) at Timer.listOnTimeout (timers.js:267:5)
```
This may be a memory issue.  Just running the unit tests by themselves works fine:
```
PASS  src/components/item/item.spec.ts
 PASS  src/components/button/button.spec.ts

Test Suites: 2 passed, 2 of 4 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        10.358s
Ran all test suites.
```

Made a separate script to do just this to separate them from the e2e tests.
*npm run units* is the command.


Next up, @Watch(), @Method(), and @State().


## JSDocs

*npm run docs*

```
$ npm -v
3.10.9
QuinquenniumF:socius tim$ nvm use 9
module.js:471
    throw err;
    ^
Error: Cannot find module './nvm-help'
    at Function.Module._resolveFilename (module.js:469:15)
    at Function.Module._load (module.js:417:25)
    at Module.require (module.js:497:17)
    at require (internal/module.js:20:19)
    at Object.<anonymous> (/usr/local/lib/node_modules/nvm/bin/nvm:24:3)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
```    

[SO Solution](https://stackoverflow.com/questions/17668101/nvm-giving-error-while-doing-nvm-ls) and then:
```
source ~/.nvm/nvm.sh
nvm ls
```

```
$ npm run docs
> folia-ui@0.0.1 docs /Users/tim/repos/loranthifolia-teretifolia-curator/socius
> stencil build --docs
[53:30.0]  @stencil/core v0.15.2 🌯
[53:30.0]  build, folia-ui, prod mode, started ...
[53:30.1]  transpile started ...
[53:32.2]  transpile finished in 2.08 s
[53:34.8]  module map started ...
[53:34.8]  generate styles started ...
[53:35.4]  module map finished in 589 ms
[53:35.7]  generate styles finished in 961 ms
[53:35.7]  generate bundles started ...
[53:35.8]  generate bundles finished in 4 ms
[53:35.8]  generate app files started ...
[53:46.4]  generate app files finished in 10.67 s
[53:58.4]  created readme docs: folia-button
[53:58.4]  build finished in 28.38 s
```


### Docs typo
*When this feature is used it an be useful for others to easily find and read formatted docs about one component.* should be *can* not *an*.
https://stenciljs.com/docs/docs-auto-generation

*To simplify it all, Stencil breaks it down to so developers have a defined description of when to use each type of testing.* "down to so" should be "down so".
https://stenciljs.com/docs/testing-overview/

## Stencil Component Starter

This is a starter project for building a standalone Web Component using Stencil.

Stencil is also great for building entire apps. For that, use the [stencil-app-starter](https://github.com/ionic-team/stencil-app-starter) instead.

## Stencil

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Getting Started

To build the component for production, test, generate docs, etc, run:
```bash
npm run build
npm test
npm run docs
```

Need help? Check out our docs [here](https://stenciljs.com/docs/my-first-component).


## Naming Components

When creating new component tags, we recommend _not_ using `stencil` in the component name (ex: `<stencil-datepicker>`). This is because the generated component has little to nothing to do with Stencil; it's just a web component!

Instead, use a prefix that fits your company or any name for a group of related components. For example, all of the Ionic generated web components use the prefix `ion`.


## Using this component

### Script tag

- [Publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- Put a script tag similar to this `<script src='https://unpkg.com/my-component@0.0.1/dist/mycomponent.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install my-component --save`
- Put a script tag similar to this `<script src='node_modules/my-component/dist/mycomponent.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install my-component --save`
- Add an import to the npm packages `import my-component;`
- Then you can use the element anywhere in your template, JSX, html etc
