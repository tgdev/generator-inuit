'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var InuitGenerator = module.exports = function InuitGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.varsFile = this.readFileAsString(path.join(this.sourceRoot(), '_vars.scss'));

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
      type: 'checkbox',
      name: 'modules',
      message: 'Which inuit modules would you like to use?\n',
      choices: [
        {
          name: 'grids'
        },
        {
          name: 'flexbox'
        },
        {
          name: 'columns'
        },
        {
          name: 'nav'
        },
        {
          name: 'options'
        },
        {
          name: 'pagination'
        },
        {
          name: 'breadcrumb'
        },
        {
          name: 'media'
        },
        {
          name: 'marginalia'
        },
        {
          name: 'island'
        },
        {
          name: 'block-list'
        },
        {
          name: 'matrix'
        },
        {
          name: 'split'
        },
        {
          name: 'this-or-this'
        },
        {
          name: 'link-complex'
        },
        {
          name: 'flyout'
        },
        {
          name: 'arrows'
        },
        {
          name: 'sprite'
        },
        {
          name: 'icon-text'
        },
        {
          name: 'beautons'
        },
        {
          name: 'lozenges'
        },
        {
          name: 'rules'
        },
        {
          name: 'stats'
        },
        {
          name: 'greybox'
        }
      ]
    },
    {
      type: 'confirm',
      name: 'setupSMACSS',
      message: '\nSMACSS helps structure your css into manageable modules. Would you like to include the SMACSS files?\n',
      default: false
    },
    {
      type: 'confirm',
      name: 'useGrunt',
      message: '\nWould you like to automate your workflow with Grunt?\n',
      default: false
    }
  ];

  this.prompt(prompts, function (answers) {
    
    this.setupSMACSS = answers.setupSMACSS;
    this.useGrunt = answers.useGrunt;
    this.modules = answers.modules;

    cb();

  }.bind(this));
};

InuitGenerator.prototype.smacssFiles = function smacssFiles() {
  if(this.setupSMACSS) {

    // add extra directories
    this.mkdir('app/css/src/modules');
    this.mkdir('app/css/src/plugins');

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
      this.template('smacss/_'+ smacssFiles[i] + '.scss', 'app/css/src/_' + smacssFiles[i] + '.scss');
    }
  }
};

InuitGenerator.prototype.gruntSetup = function gruntSetup() {
  if(this.useGrunt) {
    // add gruntfile
    this.template('Gruntfile.js', 'Gruntfile.js');
  } else {
    // provide Sass watch script to monitor changes to .scss files during dev
    this.template('watch', 'app/css/watch');
  }
};

InuitGenerator.prototype.modifyVarsFile = function modifyVarsFile() {

  // All inuit Modules
  var availableModules = [
    'grids',
    'flexbox',
    'columns',
    'nav',
    'options',
    'pagination',
    'breadcrumb',
    'media',
    'marginalia',
    'island',
    'block-list',
    'matrix',
    'split',
    'this-or-this',
    'link-complex',
    'flyout',
    'arrows',
    'sprite',
    'icon-text',
    'beautons',
    'lozenges',
    'rules',
    'stats',
    'greybox'
  ],
      selectedModules = this.modules,
      content = [],
      str = '',
      hook = '/*===== yeoman modules-hook do-not-remove =====*/';

  //check if modules have been chosen
  if(selectedModules.length > 0) {

    // loop through all inuit modules
    for (var i = 0; i < availableModules.length; i++) {
      //check selectedModules array against availableModules for a match
      if( selectedModules.indexOf( availableModules[i] ) > -1 ) {
        // if there is a match, set module to true - user will use this module in their project
        str = '$use-' + availableModules[i] +': true;';    
      } else {
        // otherwise, set module to false - user will NOT use this module in their project
        str = '$use-' + availableModules[i] +': false;';      
      }      
      content.push(str);
    }

  } else {
    // loop through all inuit modules
    for(var k = 0; k < availableModules.length; k++) {    
      // set module to false - user will NOT use this module in their project
      str = '$use-' + availableModules[k] + ': false;';
      content.push(str);    
    }  
  }

  // add new line for better readability
  var output = content.join('\n');

  // replace yeoman hook with modules and their boolean values
  this.varsFile = this.varsFile.replace(hook, output);

};

InuitGenerator.prototype.setupApp = function setupApp() {

  //scaffold assets dir structure
  this.mkdir('app/css');
  this.mkdir('app/css/src');
  this.mkdir('app/img');
  this.mkdir('app/js');
  this.mkdir('app/js/vendors');
  this.mkdir('app/js/plugins');
  this.mkdir('app/js/src');

  // copy files
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_gitignore', '.gitignore');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

InuitGenerator.prototype.projectfiles = function projectfiles() {
  this.write('app/css/_vars.scss', this.varsFile); // add modules from modifyVarsFile()
  this.template('style.scss', 'app/css/style.scss');
  this.template('index.html', 'app/index.html');
  this.copy('plugins.js', 'app/js/src/plugins.js');
  this.copy('main.js', 'app/js/src/main.js');
};