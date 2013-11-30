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
  console.log('This will install the inuit css framework created by Harry Roberts with a few optional extras.');
  console.log('For documentation and demos visit: http://inuitcss.com/');
  console.log('*** NOTE: Inuit.css requires Sass 3.2 ***');

  var prompts = [
    {
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to select this option?',
      default: false
    }
  ];

  this.prompt(prompts, function (props) {
    this.activatedObjects = props.activatedObjects;
    cb();
  }.bind(this));
};

InuitGenerator.prototype.setupApp = function setupApp() {
  this.mkdir('css');
  this.mkdir('img');
  this.mkdir('js');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

InuitGenerator.prototype.getInuit = function getInuit() {
  this.bowerInstall('inuit.css', { save:true });
};

InuitGenerator.prototype.projectfiles = function projectfiles() {
  this.template('_vars.scss', 'css/_vars.scss');
  this.template('style.scss', 'css/style.scss');
  this.template('index.html', 'index.html');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};