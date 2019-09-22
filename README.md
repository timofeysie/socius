# Socius

A web component library built with ![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)


## Table of content

1. [Stencil workflow](#stencil-workflow)
1. [Microinteractions](#microinteractions)
1. [Using the tabs](#using-the-tabs)
1. [HTML<name>Element](#hTML<name>Element)
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


## Microinteractions

For different types of buttons, we want to show some animations to let the user know something has happened.  These interactions can work with the ... (this sentence was left incpmplete for some reason).

In order to get the buttons to start a microinteraction when the user selects means accessing the DOM button element.  First of all, the text should fade out as the button shrinks down to a circle.  Then a spinner should activate and wait for the result of whatever API call or async function to complete.

We can use something like this to target a button within it's component like this:
```
let button = this.element.shadowRoot.querySelector('button');
button.style.minWidth = '10px';
button.style.borderRadius = '50px';
this.element.innerHTML = '';
```

You can read about more about it in the [StencilJS docs](https://stenciljs.com/docs/styling/) or about the HTML element on the [MDM](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style).

Next we create a basic [css only spinner](https://stephanwagner.me/only-css-loading-spinner) and add the class to the button as the transition happens.

Finally for a successful resolution, show a checkmark, then animate it for more delight.

So far the onclick for the loading phases is working somewhat.  It is not using the styles for each particular button type, only the default.  It needs to work for all the button types we want to create, so that needs some though on handling that.

Another issue is the return phase loses it's animation.  Something about the way we are transitioning the min-width...  Yesterday it was working, but while fixing some other issues it went back to losing the transition again.  It's a little tricky finding out how to work with the shadow DOM for this.
```
import { State } from '@stencil/core';
@State() children: Array<any> = [];
componentWillLoad() {
    let slotted = this.host.shadowRoot.querySelector('slot') as HTMLSlotElement;
    this.children = slotted.assignedNodes().filter((node) => { return node.nodeName !== '#text'; });
}
```

This shows up as an empty array.  Not sure why.  Possibly this is out of date [info from SO](https://stackoverflow.com/questions/52421298/web-components-how-to-work-with-children).  From Sept. 2018.  Their current release is version 0.18.1, so there are definitely breaking changes going on.

If you add a div or span to the button text, the element will then show up.  If you get the inner HTML from this then we can get the content to put it back when the button is expanding again:
```
this.element.shadowRoot.querySelector('button');
```

It seems like it is this content which is actually causing the button to jump back to it's original size.  On the default button, with it's shorter text, you do see part of the animation happening.

Doing something like this in the css doesn't help:
```
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
```

Setting a timeout works, but it's a bit strange and hacky.  A better way would be to wait for the animation to trigger and then add the text back.  But really, we would like to have the text there and just become revealed as the animation is happening.

However, this is not a show stopper for now.  We should solve more important issues such as preserving the button type styles instead of going back to the defaults.

There is also the *detail* that we are using a round spinner for both rounded and square buttons.  We were rounding off the square buttons, but we should consider using a square spinner for square buttons.

This comes down to architecture.  We need to have separate properties and transition for each variable that we let the user pass in.

If we just work with the classes, this would be the cleanest approach.  

Right now, the styles are kept, but the button is jumping a bit vertically.  Also, even with a space inserted in the temporary text, the space collapses and expands again only when the text is put back into the inner HTML.

Current issues to fix before a push to npm:

1. vertical jumping
2. collapsing space
3. spinner needs to match type sizes
4. all large before inspector opens

Both 1 & 2 are related and may be the same fix.  After including the old &nbsp; as the loading inner HTML, the height is close to what it should be.  But the spinner now needs to be the correct size for each type.  Css variables anyone?  Or a sass mixin?

Also, the smaller buttons jump to large size during the transition.  Removing the padding that was added to fix an issue when there was a problem in the JavaScript solves this.  Just goes to show that refactoring to removing unused things after a bit of work is so important.  If it's not doing anything, get it out of there!

Actually, things like the empty lifecycle hooks and StencilJS best-practice notes are helpful since this is a new framework, so those things can stay.

These are the styles in the spinner that need to be adjust for the custom button size properties:
```
width: 20px;
height: 20px;
margin-top: -10px;
margin-left: -10px;
```

We have a bit of a problem as the buttons don't have matching attributes, so we can't straight re-used the same values there.  Or maybe we should set them now so they *can* be used.  Hey, that's an idea!

Since there are only two sizes right now (default is small), these classes did the trick:
```
.loading_small:before { ... }
.loading_large:before { ... }
```

And in the class:
```
button.className = button.className+' spinner loading loading_'+this.size;
```

It may not be the best architecural solution around, but it might just be the simplest.  At least until we have too many types and too much duplications.  Then another solution will most likely present itself.

The only other thing now besides tweaking the position of the spinners and the width of the loading buttons, is to make the activated via the @Prop type.

Right now we have:
```
  @Prop() type: 'button' | 'reset' | 'submit' = 'button';
```

We need to add loading, success, and error.  Loading is what we have right now with the transition to the spinner.  As mentioned before, success will have a check mark animation, and error, an X.  Then setting the button back to submit will go back to the initial state.  But these states will all be up to the app using the component to take care of.

Then the fun part will be using it in an app to trigger an API call.  Yay!

But first, the work.  This was a problem for all our wet code:
```
Operator '===' cannot be applied to types "'button' | 'reset' | 'submit'"
```

It actually should be shape there, but one inane way to get around this is:
```
if (this.shape === 'round' || this.shape !== 'square') {
```

Expect this to be re-factored.  For now we have a new square spinner (based on an example on [css-tricks](https://css-tricks.com/almanac/properties/t/transform/)that rotates with a css-only spin:
```
animation: roll 3s infinite;
transform: rotate(30deg);
```

Next up, the type property listener and using the state decorator.

* @State() decorator is used to manage data that is internal to the component.
* @Watch() decorator for a specific property on the component class, and decorates a method which is called upon that property being changed.

We can use the watch decorator to call a function to then decide what action to perform.  Then, we have to do some work on the demo page which will show a button with selectors to change the properties of the button and trigger our new watch state change function.

We are currently on Stencil version 0.0.5.  As we found out yesterday, the current release is version 0.18.1.  Before getting too comfortable with the current code, this needs to be updated.  Anyone want to put money on if the app will run with the current version?


Using [this codepen](https://codepen.io/scottloway/pen/zqoLyQ) by Scott Galloway as a starting point for the success checkmark animation.

Making two separate version for the small and large sizes is easy to do.  Using Sass variables makes it a little more interesting, but there is still a lot of repetition in the classes that can be eliminated given a bit more time.

For now, the success checkmark animation is working fine.  Next will be the error microinteration which would be to show an X instead of a check.

The basic checkbox without needing any inner divs or svg elements is easy enough.  [This SO question](https://stackoverflow.com/questions/27526821/how-to-draw-error-icon-with-css-only-exactly-like-in-the-image) has a range of answers providing examples of all different kinds.  The [jbutler483](https://stackoverflow.com/users/3436942/jbutler483) with 17,803 reputation points (as if that matters) shows the simplest solution.

Next we need to animate it.  That might not be so simple.  We also need to refactor the button JavaScript at this point, as the initial state solution has a lot of repeated code in there.  We want to get closer to a single function for each state that works for both shape and size.

Not sure where the saga ended when other projects took over from the work that was going into this.  Now, six months later, we are back here.  I think it was the error state X animation that was holding back a first release.  Now, the first thoughts are, upgrade, simplify, actually publish.

As things stand, we have this:
```
$ npm list @stencil/core
folia-ui@0.0.3 /Users/tim/repos/socius
└── @stencil/core@0.15.2
```

On the [docs page]() it says you can do this to upgrade:
```
npm install @stencil/core@latest --save-exact
```

Since nothing is working (action wise) anyhow, I just went ahead and did that without worrying about breaking the app.  Site back think about the nature of writing things like this.  I know it's too much information.  The notes about how to do something and the problems that arise and their solutions is worthwhile, don't get be wrong.  But after reading this section in the readme again after six months showed me that the narrative part was not really useful for anyone, or meaningful if it was never going to be read again as part of a larger narrative.

That thought gotten down, the result of the command is this in the package.json file:
```
"@stencil/core": "1.4.0",
```

Who want's to be if the app will now run.  Above we already had encountered some migration issues.  Is it about 40/60 to working/not working?  I am optimistic and think it's going to work.  Maybe 'think' is not the right word there.  Then what is?

Moving on, it runs, and the result is the same as before the upgrade.

Next, even if it was working, the code is now too complex.  At the end of the period of activity on this project six months ago, Ik had complained to someone at the React meetup that trying to mix the code for a button that had either a square or round style, and a square micro-interaction and a circular micro-interaction, was a bad idea.

It would have been easier to create a rounded button with it's interaction, then made a square button with it's own version.  The guy at the meetup had suggested making that, and then a wrapper that would be able to choose which implementation to choose.  That's a good idea.  It incorporates both of mine.

What works is the style changes.  What doesn't work is the state.  The select on the index page has button(default), submit, loading, success, error and reset states.  But changing this does nothing, as does clicking on the buttons which is supposed to trigger the transitions.

Thinking about what to do next, it seems like having a library with both round and square buttons is not really what anybody wants/  It was a nice experiment, but if I'm going to make a component library, it will be specific to the project the buttons will be used in.

With this in mind, I think an Ionic app that adds micro-interactions would be a good idea.  Let someone else take care of the component part of things.


## Using the tabs

This is a work in progress.  To listen to a tab changed event outside of the component and react to it, use something like the following:
```
const tabs = document.querySelector('mtn-tabs');
tabs.addEventListener('change', event => {
  // You'll find your emitted object under event.detail
  console.log(`CHANGED TABS TO INDEX ${event.detail.tabId}`);
});
```

This demo was never finished.  The next step would have been to go to the source and make sure the tabs are correctly implemented.  But the code bases have diverged with the micro-interactions work, so that's not going to happen right now.



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
