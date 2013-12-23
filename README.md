# generator-inuit

A [Yeoman](http://yeoman.io) generator for Harry Robert's [inuit](http://inuitcss.com) css framework.


## Getting Started

### Installing and running the inuit generator

To install generator-inuit from npm, run:

```
$ npm install -g generator-inuit
```

Then, from your projects directory, initiate the generator:

```
$ yo inuit
```

### Helpful articles from [CSS Wizardry](http://csswizardry.com)
Below are 3 of the most helpful reference to understanding Inuit and OOCSS concepts to get the most out of inuit

[The open/closed principle applied to CSS](http://csswizardry.com/2012/06/the-open-closed-principle-applied-to-css/)

[MindBEMding – getting your head ’round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

[The single responsibility principle applied to CSS](http://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/)

## Features

### SMACSS support
[Jonathan Snook's](http://snook.ca) SMACSS guide helps organise your site's CSS into flexible, maintainable chunks.

Files created are;
- 1-base.scss
- 2-layout.scss
- 3-states.scss
- 4-theme.scss

These files are placed in the css/src directory and automatically imported into css/style.scss.

Two more directories are added place your Sass partials into;
- css/src/modules
- css/src/plugins

For more info on SMACSS, visit [SMACSS website](http://smacss.com).

### Grunt support
[Grunt](http://gruntjs.com) helps automate your workflow.

####Modules
- open
- connect
- watch (w/ livereload)
- clean
- copy
- concurrent
- compass
- imagemin
- svgmin
- cssmin
- concat
- uglify

####Tasks

**grunt server - used during development**

Opens localhost server, prepares livereload and watches for changes

**grunt build - used for generating production files**

cleans up dist directory, concats and uglifies assets (img, css, js) and copies files ready for deployment

*NOTE: Saying no to grunt option will generate a basic watch file to watch for Sass changes via the command line*


## Yeoman Info

### What is Yeoman?
Yeoman is more than just a tool. It's a workflow; a collection of tools and best practices working in harmony to make developing for the web even better.

Find out more at [yeoman.io](http://yeoman.io)

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Changelog

v0.3.0 - Grunt option/support

v0.2.0 - SMACSS option/support

v0.1.0 - Basic bowser install of inuit.css

## Roadmap
I've only just started working on this and have a tonne of options and added extras/customisation I'm want to include such as;

### Inuit Objects & Abstractions
Choose which inuit objects/abstractions you want to use in your project. To skip this step, simply press enter as these can be configured manually once your project has been generated via the _vars.scss file.

### Sass module subgenerator
Create new Sass modules from the command line and let the generator automatically create the file in 'app/css/src/modules' and add the @import statement to style.scss