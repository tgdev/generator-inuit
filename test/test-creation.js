/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('inuit generator', function () {
    beforeEach(function (done) {
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
            '.jshintrc',
            '.editorconfig',
            '_vars.scss',
            'style.scss'
        ];

        // helpers.mockPrompt(this.app, {
        //     'someOption': true
        // });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

    it('installs inuit.css bower package', function (done) {
        this.app.run({}, function () {
            assert.equal(this.bowerInstallCalls[0][0], 'inuit.css');
            done();
        }.bind(this));
    });
});
