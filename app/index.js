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
    // {
    //   type: 'checkbox',
    //   name: 'activatedObjects',
    //   message: 'Choose which of inuit\'s css modules you\'d like to use.\n' +
    //    'Simply press enter to skip this step - you can configure these later in _vars.scss.',
    //   choices: [
    //     {
    //       name: 'grids'
    //     },
    //     {
    //       name: 'media'
    //     }
    //   ]
    // },
    {
      type: 'confirm',
      name: 'setupSMACSS',
      message: 'SMACSS helps structure your css into manageable modules. Would you like to include it?'
    },
    {
      type: 'confirm',
      name: 'useGrunt',
      message: 'Would you like to automate your workflow with Grunt?',
      default: false
    }
  ];

  this.prompt(prompts, function (props) {
    // this.activatedObjects = props.activatedObjects;
    this.setupSMACSS = props.setupSMACSS;
    this.useGrunt = props.useGrunt;

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
  this.bowerInstall('inuit.css', { save:true });
  this.template('index.html', 'app/index.html');
  this.template('_vars.scss', 'app/css/_vars.scss');
  this.template('style.scss', 'app/css/style.scss');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

// InuitGenerator.prototype.smacss = function smacss() {
//   if(setupSMACSS) {
//     // add extra directories
//     this.mkdir('app/css/modules');
//     this.mkdir('app/css/plugins');
    
//     // store smacss files in an array
//     var smacssFiles = [
//       '1-base',
//       '2-layout',
//       '3-states',
//       '4-theme'
//     ];

//     // prepare content before updating style.scss
//     var insert = '';

//     // loop through smacss files
//     for(var i = 0; i < smacssFiles.length; i++) {
//       // copy files over to project
//       this.copy('smacss/_'+ smacssFiles[i] + '.scss', 'app/css/src/_' + filesToMove[i] + '.scss');
//       // import files into main stylesheet
//       insert += '@import "css/src/' + smacssFiles[i] + '"\n';
//     }

//     InuitGenerator.prototype._updateFile('style-hook', 'app/css/style.scss', insert);

//     console.log('SMACSS setup complete')
//   }
// };

// InuitGenerator.prototype.gruntfile = function gruntfile() {
//   if(this.useGrunt) {
//     this.copy('Gruntfile.js', 'Gruntfile.js');
//   } else {
//     this.copy('watch', 'app/css/watch');
//   }
// };

// InuitGenerator.prototype._updateFile = function _updateFile(hookName, filePath, content) {
//   var hook = '/*===== yeoman ' + hookName + '=====*/',
//     file = this.readFileAsString(filePath),
//     insert = content;

//     if (file.indexOf(insert) === -1) {
//       this.write(path, file.replace(hook, insert + '\n' + hook));
//     }
// };
