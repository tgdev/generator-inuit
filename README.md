# generator-inuit [![Build Status](https://secure.travis-ci.org/tgdev/generator-inuit.png?branch=master)](https://travis-ci.org/tgdev/generator-inuit)

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

## Plans

I've only just started working on this and have a tonne of options and added extras/customisation I'm want to include such as;

### SMACSS support
If you're into [SMACSS](http://smacss.com) like I am you can pick this option to have the base SMACSS file structure on top of inuit.

Files created are;
- 1-base.scss
- 2-layout.scss
- 3-states.scss
- 4-theme.scss

Also modules and plugins directories will be added to place your Sass partials into.

### Grunt support
Choose from list of grunt task to generate custom package.json and grunt files. 

Saying no to grunt will generate a basic watch file to watch for Sass changes via the command line

### Object/Abstration loading
Choose which inuit objects you want to use in your project or, just hit enter to skip this step and choose them later.

### Sass module subgenerator
Create new Sass modules from the command line and let the generator automatically create the file in 'app/css/src/modules' and add the @import statement to style.scss

## Yeoman Info

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
