/*global describe, beforeEach, it*/
'use strict';

var path    = require('path'),
    helpers = require('yeoman-generator').test,
    assert  = require('assert');


describe('inuit generator', function () {
    beforeEach(function (done) {

        this.bowerInstallCalls = [];

        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('inuit:app', [
                '../../'
            ]);

            // Mock bower install and track the function calls.
            this.app.bowerInstall = function () {
                this.bowerInstallCalls['inuit.css'];
            }.bind(this);
            
            done();
        }.bind(this));
    });

    it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
        this.app = require('../');
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            'package.json',
            'bower.json',
            '.editorconfig',
            '.jshintrc',
            'css/_vars.scss',
            'css/style.scss'
        ];

        helpers.mockPrompt(this.app, {
            'setupSMACSS': false
        });

        this.app.options['skip-install'] = true;

        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

    it('installs inuit.css bower package', function (done) {
        helpers.mockPrompt(this.app, {
            'setupSMACSS': false
        });
    
        this.app.options['skip-install'] = true;
        
        this.app.run({}, function () {
            assert.equal(this.bowerInstallCalls[0], 'inuit.css');
            done();
        }.bind(this));
    });

    it('creates SMACSS files', function (done) {
        var expected = [
            'css/src/_1-base.scss',
            'css/src/_2-layout.scss',
            'css/src/_3-states.scss',
            'css/src/_4-theme.scss'
        ];

        helpers.mockPrompt(this.app, {
            'setupSMACSS': true
        });

        this.app.options['skip-install'] = true;

        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

});