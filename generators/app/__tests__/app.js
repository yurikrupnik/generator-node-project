const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

describe('generator app', () => {
    describe('generate a client project', () => {
        it('generate a client project with default answers', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withPrompts({
                    appType: 'client',
                    sass: true,
                })
                .then(function(res) {
                    assert.file([
                        '.babelrc',
                        '.eslintrc',
                        '.gitignore',
                        'jestsetup.js',
                        'package.json',
                        'LICENSE'
                    ]);
                });
        });
        it('generate a client project without sass', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withPrompts({
                    appType: 'client',
                    sass: false,
                })
                .then(function(res) {
                    assert.file([
                        '.babelrc',
                        '.eslintrc',
                        '.gitignore',
                        'jestsetup.js',
                        'package.json',
                        'LICENSE'
                    ]);
                });
        });
    });
    describe('generate a server project', () => {
        it('generate a server project with default answers', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withPrompts({
                    appType: 'server',
                    db: true,
                    auth: true,
                    io: true
                })
                .then(function(res) {
                    assert.file([
                        '.babelrc',
                        '.eslintrc',
                        '.gitignore',
                        'jestsetup.js',
                        'package.json',
                    ]);
                });
        });
        it('generate a server project without db', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withPrompts({
                    appType: 'server',
                    db: false
                })
                .then(function() {
                    assert.file([
                        '.babelrc',
                        '.eslintrc',
                        '.gitignore',
                        'jestsetup.js',
                        'package.json',
                    ]);
                });
        });
        it('generate a server project without auth', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withPrompts({
                    appType: 'server',
                    db: true,
                    auth: false
                })
                .then(function() {
                    assert.file([
                        '.babelrc',
                        '.eslintrc',
                        '.gitignore',
                        'jestsetup.js',
                        'package.json',
                    ]);
                });
        });
        it('generate a server project without io', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withPrompts({
                    appType: 'server',
                    io: false
                })
                .then(function() {
                    assert.file([
                        '.babelrc',
                        '.eslintrc',
                        '.gitignore',
                        'jestsetup.js',
                        'package.json',
                    ]);
                });
        });
    });

    describe('generate a fullstack project', () => {
        it('generate a fullstack project with default answers', function () {
            return helpers.run(path.join(__dirname, '../index.js'))
                .withPrompts({
                    appType: 'fullstack',
                    sass: true,
                    auth: ['google', 'facebook']
                })
                .then(function(res) {
                    assert.file([
                        // '.babelrc',
                        // '.eslintrc',
                        // '.gitignore',
                        // 'jestsetup.js',
                        // 'package.json',
                        // 'LICENSE'
                    ]);
                });
        });
    });
});
