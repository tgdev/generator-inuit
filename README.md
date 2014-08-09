# generator-inuit

A [Yeoman](http://yeoman.io) generator for Harry Robert's [inuit](http://inuitcss.com) css framework.

**NOTE: Requires Sass 3.3**

## Getting Started

### Installing and running the inuit generator

To install generator-inuit from npm, run:

```
npm install -g generator-inuit
```

Then, from your projects directory, initiate the generator:

```
yo inuit
```

### Helpful articles from [CSS Wizardry](http://csswizardry.com)
Below are 3 of the most helpful references to understanding Inuit and OOCSS concepts.

[MindBEMding – getting your head ’round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

[The open/closed principle applied to CSS](http://csswizardry.com/2012/06/the-open-closed-principle-applied-to-css/)

[The single responsibility principle applied to CSS](http://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/)

## Features

### Inuit Objects & Abstractions
Choose which inuit objects/abstractions you want to use in your project.

To skip this step, simply press enter as these can be configured manually once your project has been generated via the _vars.scss file.

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

####Tasks

**Development**

```
grunt serve
```

- activates livereload
- opens site in browser (http://localhost:9000)
- watches files for changes

```
grunt watch
```

- watches for changes on all html files and assets (sass & js)

**Production**

```
grunt build
```

- Generates minified site stylesheet
- Optimises images
- Concatinates and minifies js
- Places all build assets (css, js & imgs) in dist directory
- Copies all other build files (.ico, html & web fonts) to dist directory

There are way more things you can do with grunt like [Responsive Images](https://github.com/andismith/grunt-responsive-images), [HTML Partials](https://github.com/vanetix/grunt-includes), [Compass](https://github.com/gruntjs/grunt-contrib-compass), and [loads more](http://gruntjs.com/plugins), so feel free to add more to your gruntfile and package.json.

*NOTE: Saying no to grunt option will generate a basic watch file to watch for Sass changes via the command line*

### Sass module sub-generator

```
yo inuit:sassmod "module-name"
```

#### How it works
- Creates partial sass file in css/src/modules/_[module-name].scss
- Adds @import "src/modules/[module-name]"; into style.scss

*Note: you will be prompted by the sub-generator to overwrite style.scss with the new changes. Please choose yes and then enter.*

## Yeoman Info

### What is Yeoman?
Yeoman is more than just a tool. It's a workflow; a collection of tools and best practices working in harmony to make developing for the web even better.

Find out more at [yeoman.io](http://yeoman.io)

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Changelog

v0.6.5 - Found dependency in quotes sass module using !global (Sass 3.3)

v0.6.4 - Fixed error in gruntfile

v0.6.3 - Added missing grunt tasks to grunt build

v0.6.0 - Restructured scaffolding to separate files into app and dist. Added additional grunt tasks (autoprefixer, cssmin and rigger)

v0.5.2 - Fixed livereload issue and upgraded imagemin grunt package

v0.5.0 - Create partial sass files with sub-generator

v0.4.0 - Activate inuit modules

v0.3.0 - Grunt option/support

v0.2.0 - SMACSS option/support

v0.1.0 - Basic bowser install of inuit.css

## Thank yous
Two people deserve a mention for helping me get a couple of the features done in one way or another.

1. [Ritchie Anesco](https://github.com/ritchieanesco) for helping out with the inuit objects & abstrations feature

2. [Remy Bach](https://github.com/remybach) for [this article](http://remy.bach.me.uk/blog/2013/10/updating-existing-files-with-yeoman/) which enabled me to write content to the _vars.scss and style.scss files via a simple 'find hook and replace' solution.