'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var SassmodGenerator = module.exports = function SassmodGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

};

util.inherits(SassmodGenerator, yeoman.generators.NamedBase);

SassmodGenerator.prototype.files = function files() {
  var filename = '_' + this._.slugify(this.name) + '.scss';
  this.write('css/src/modules/' + filename, '// ' + this.name + ' Sass Module');

};

SassmodGenerator.prototype.importNewModule = function importNewModule() {
  var hook   = '/*===== yeoman styles-hook do-not-remove =====*/',
  	path   = 'css/style.scss',
	file   = this.readFileAsString(path),
	mod   = this.name.toLowerCase(),
	insert = '@import "src/modules/' + mod + '";';

  if (file.indexOf(insert) === -1) {
    this.write(path, file.replace(hook, insert + '\n' + hook));
  }

};
