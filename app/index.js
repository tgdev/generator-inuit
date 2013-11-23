'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var InuitGenerator = module.exports = function InuitGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(InuitGenerator, yeoman.generators.Base);

InuitGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  console.log('This will install the inuit css framework created by Harry Roberts with a few optional extras.\n
    For documentation and demos visit: http://inuitcss.com/\n\n');
  console.log('*** NOTE: Inuit.css requires Sass 3.2 ***');

  var prompts = [
    {
      type: 'confirm',
      name: 'someOption',
      message: 'Want to choose this option?'
    }
  ];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

InuitGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/css');
  this.mkdir('app/css/src');
  this.mkdir('app/css/dist');
  this.mkdir('app/img');
  this.mkdir('app/js');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

InuitGenerator.prototype.projectfiles = function projectfiles() {
  this.bowerInstall('inuit.css', { save:true })
    .on('end', function (installed) {
      console.log('Inuit.css installed successfully!');
      // console.log(installed);
    })
    .on('error', function (err) {
      console.log(err);
    });
  this.template('_vars.scss', 'app/css/_vars.scss');
  this.template('style.scss', 'app/css/style.scss');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};