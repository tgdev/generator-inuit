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
  console.log('*** NOTE: Inuit.css requires Sass 3.2 ***\n');

  var prompts = [
    {
      type: 'confirm',
      name: 'setupSMACSS',
      message: 'SMACSS helps structure your css into manageable modules. Would you like to include it?',
      default: false
    }
  ];

  this.prompt(prompts, function (answers) {
    
    this.setupSMACSS = answers.setupSMACSS;

    cb();
  }.bind(this));
};

InuitGenerator.prototype.getInuit = function getInuit() {
  var cb = this.async();
  this.bowerInstall('inuit.css', { save:true });
  cb();
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
  var cb = this.async();
  this.template('_vars.scss', 'css/_vars.scss');
  this.template('style.scss', 'css/style.scss');
  this.template('index.html', 'index.html');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  cb();
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
    
    var insert = '';

    // loop through smacss files
    for(var i = 0; i < smacssFiles.length; i++) {
      // copy template files over to project
      this.template('smacss/_'+ smacssFiles[i] + '.scss', 'css/src/_' + smacssFiles[i] + '.scss');
      // prepare content before updating style.scss
      if( (i + 1) === smacssFiles.length) {
        insert += '@import "src/' + smacssFiles[i] + '"\n';
      } else {
        insert += '@import "src/' + smacssFiles[i] + '",\n';
      }
    }

    // console.log("SMCASS imports: ", insert);
    // console.log('SMACSS setup complete');
    // import files into main stylesheet
    InuitGenerator.prototype._updateFile('style-hook', 'css/style.scss', insert);
  }
};

InuitGenerator.prototype._updateFile = function _updateFile(hookName, filePath, content) {
  var hook = '/*===== yeoman ' + hookName + ' =====*/',
      file = this.readFileAsString(filePath),
      insert = content;

    // console.log('hookName: ', hookName);
    // console.log('hook: ', hook);

    // console.log('filePath: ', filePath);
    // console.log('file: ', file);

    // console.log('Content: ', content);
    // console.log('insert: ', insert);

    if (file.indexOf(insert) === -1) {
      console.log('ready to add smacss imports to style.scss!!!');
      // this.write(path, file.replace(hook, insert + '\n' + hook));
    }
};

 // var routeText = [
 //        "Flight::route('GET /crudPlural', array('crudSingle_Controller','all') ); ",
 //        "Flight::route('PUT /crudSingle', array('crudSingle_Controller','create') ); ",
 //        "Flight::route('GET /crudSingle/@id', array('crudSingle_Controller','findOne') ); ",
 //        "Flight::route('POST /crudSingle/@id', array('crudSingle_Controller','update') ); ",
 //        "Flight::route('DELETE /crudSingle/@id', array('crudSingle_Controller','delete') ); ",
 //        "//RouteInsertReference"
 //     ];
 //    var indexFile = this.readFileAsString('public/index.php');
 //    indexFile = indexFile.replace('//RouteInsertReference',routeText.join('\n'));
 //    this.write('public/index.php',indexFile);