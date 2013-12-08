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
  console.log('This will install the inuit css framework created by Harry Roberts with a few optional extras. For documentation and demos visit: http://inuitcss.com/');
  console.log('*** NOTE: Inuit.css requires Sass 3.2 ***\n\n');

  var prompts = [
    {
      type: 'confirm',
      name: 'setupSMACSS',
      message: 'SMACSS helps structure your css into manageable modules. Would you like to include the SMACSS files?\n',
      default: false
    },
    {
      type: 'confirm',
      name: 'useGrunt',
      message: 'Would you like to automate your workflow with Grunt?\n',
      default: false
    }
  ];

  this.prompt(prompts, function (answers) {
    
    this.setupSMACSS = answers.setupSMACSS;
    this.useGrunt = answers.useGrunt;

    cb();

  }.bind(this));
};

InuitGenerator.prototype.setupApp = function setupApp() {
  var cb = this.async();
  this.mkdir('css');
  this.mkdir('css/src');
  this.mkdir('img');
  this.mkdir('js');
  this.mkdir('js/src');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  cb();
};

InuitGenerator.prototype.projectfiles = function projectfiles() {
  this.template('_vars.scss', 'css/_vars.scss');
  this.template('style.scss', 'css/style.scss');
  this.template('index.html', 'index.html');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

InuitGenerator.prototype.smacssFiles = function smacssFiles() {
  if(this.setupSMACSS) {

    // add extra directories
    this.mkdir('css/src/modules');
    this.mkdir('css/src/plugins');

    // store smacss files in an array
    var smacssFiles = [
      '1-base',
      '2-layout',
      '3-states',
      '4-theme'
    ];
    
    // loop through smacss files
    for(var i = 0; i < smacssFiles.length; i++) {
      // copy template files over to project
      this.template('smacss/_'+ smacssFiles[i] + '.scss', 'css/src/_' + smacssFiles[i] + '.scss');
    }
  }
};

InuitGenerator.prototype.gruntTasks = function gruntTasks() {
  if(this.useGrunt) {
    // add gruntfile
    this.template('Gruntfile.js', 'Gruntfile.js');
  } else {
    // provide Sass watch script to monitor changes to .scss files during dev
    this.template('watch', 'css/watch');
  }
};