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
                '../../app'
            ]);

            // Mock bower install and track the function calls.
            this.app.bowerInstall = function () {
                this.bowerInstallCalls.push(arguments);
            }.bind(this);
            
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            'package.json',
            'bower.json',
            '.editorconfig',
            '.jshintrc',
            'app/css/_vars.scss',
            'app/css/style.scss'
        ];

        helpers.mockPrompt(this.app, {
            // 'someOption': true
            'setupSMACSS': false,
            'useGrunt': false
        });

        this.app.options['skip-install'] = true;

        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

    it('installs inuit.css bower package', function (done) {
        helpers.mockPrompt(this.app, {
            // 'someOption': true
            'setupSMACSS': false,
            'useGrunt': false
        });
    
        this.app.options['skip-install'] = true;
        
        this.app.run({}, function () {
            assert.equal(this.bowerInstallCalls[0], 'inuit.css');
            done();
        }.bind(this));
    });

    // it('creates SMACSS files', function (done) {
    //     var expected = [
    //         'app/css/src/_1-base.scss',
    //         'app/css/src/_2-layout.scss',
    //         'app/css/src/_3-states.scss',
    //         'app/css/src/_4-theme.scss'
    //     ];

    //     helpers.mockPrompt(this.app, {
    //         'setupSMACSS': true,
    //         'useGrunt': false
    //     });

    //     this.app.options['skip-install'] = true;

    //     this.app.run({}, function () {
    //         helpers.assertFiles(expected);
    //         done();
    //     });
    // });

    // it('adds gruntfile', function (done) {

    //     helpers.mockPrompt(this.app, {
    //         'useGrunt': true
    //     });
    //     this.app.run({}, function () {
    //         helpers.hasFile('grunt.js');
    //     });
    // });
});