# The Quad Angular Library

A shared component library which can be used in Angular 2 projects. 
The library is built with gulp which creates a lib directory that can be linked to and used by another project.

## Development Setup

Install the dependencies to build the project in the following manner:
```
$ npm i gulp gulp-sass run-sequence gulp-minify-css gulp-sourcemaps gulp-typescript typescript gulp-inline-ng2-template
```

Build the project like this:
```
$ gulp build
```

This will build the project into the lib directory.


## Set up a project ot use this library

Without using the npm ecosystem, we can link the lib to a project in the following way.

[Package linking](https://docs.npmjs.com/cli/link) is a two-step process.

First, in the project lib directory:
```
$ npm link 
```

This will create a globally-installed symbolic link from prefix/package-name to the current folder.

Next, in the node_modules of the project where you want to use this lib: 
```
$ npm link quad-angular
```
A symlink will be created from the local node_modules to the quad lib.


## Using components

There are two types of components in the library.
The first type is a simple class, for example, the data model.
The second type is a UI component.  
These two types require different methods for usage.

### A data model class
To use a class from the library, for example the Result object, in the class where you would like to use it, you only have to import the part that you want:
```
import { Result } from 'quad-angular';
```
You can then create a member variable like this:
```
result: Result;
```

### A UI component
To use a UI component, for example, the notification object, we need to add it to the app.module.ts file.
```
import * as quad from 'quad-angular/lib/components/notification.component';

@NgModule({
  declarations: [
    quad.NotificationComponent
```

The notification component has a title and content.  
These variables need to be created in the class.
(Note there is no need to import the class here):
```
export class DashboardPage {
  title: string;
  content: string;
  
  constructor(
    public navCtrl: NavController,
    public authService: Auth) {
      this.title = 'Hi there';
      this.content = 'You have notifications waiting.';
  }
```

And in the template:
```
<notification [title]="title" [content]="content"></notification>
```

If your interested in taking this further checkout out [Component Inheritance](https://scotch.io/tutorials/component-inheritance-in-angular-2) in Angular 2.


## Development

To add a class to the library, first, create the class somewhere within the src directory.
Import it into the quad.module.ts file:
```
import { Result } from './models/result';
```

Add it two both the exports and declaration arrays:
```
    exports: [
            NotificationComponent,
            Result,
            ...
    ],
    declarations: [
            NotificationComponent,
            Result,
            ...
```

Then also add an export reference in the index.ts file:
```
export * from './models/result'
```

Run gulp build and Robert will become a close family relative.

