var Generator = require('yeoman-generator');
var path = require('path');
// var G = require('generator-webpack-mussia');

var reduce = require('lodash.reduce');
const questions = require('./ques' +
    'tions');
const utils = require('./utils');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        // this.argument('appname', {type: String, required: true});

        // this.option('shit', {
        //     type: String,
        //     required: false,
        //     default: '',
        //     desc: 'Relocate the location of the generated files.'
        // });
        // this.option('is', {
        //     type: Boolean,
        //     required: false,
        //     default: false,
        //     desc: 'Relocate the location of the generated files.'
        // });
    }

    _createFilters(answers) {
        console.log(answers);
        this.filters = reduce(answers, (acc, next, key) => {
            acc[key] = Array.isArray(next) ? next.reduce((acc, next) => {
                acc[next] = true;
                return acc;
            }, {}) : next;
            return acc;
        }, {});
    }

    async prompting() {
        this.props = await this.prompt(questions);
    }

    configuring() {
        this.appName = path.basename(process.cwd());
        this._createFilters(this.props);
        this.config.set(this.filters);
    }

    writing() {
        const {options, filters} = this;
        if (utils.isFullstack(filters)) {
            this.fs.copyTpl(
                this.templatePath('fullstack'),
                this.destinationPath(),
                {filters, name: this.appName},
            );
            this.fs.copyTpl(
                this.templatePath('fullstack/.*'),
                this.destinationRoot(),
                {filters, name: this.appName},
            );
        }
        if (utils.isServer(filters)) {
            this.fs.copyTpl(
                this.templatePath('server'),
                this.destinationPath(),
                {filters, name: this.appName},
            );
            this.fs.copyTpl(
                this.templatePath('server/.*'),
                this.destinationRoot(),
                {filters, name: this.appName},
            );
            if (filters.db) {
                this.fs.copyTpl(
                    this.templatePath('api/users'),
                    this.destinationPath('src/api/users'),
                    {filters, name: this.appName},
                );
                this.fs.copyTpl(
                    this.templatePath('api/projects'),
                    this.destinationPath('src/api/projects'),
                    {filters, name: this.appName},
                );
            }
            if (filters.auth) {
                this.fs.copyTpl(
                    this.templatePath('api/auth'),
                    this.destinationPath('src/api/auth'),
                    {filters, name: this.appName},
                );
            }
        }
        if (utils.isClient(filters)) {
            this.fs.copyTpl(
                this.templatePath('client'),
                this.destinationPath(),
                {filters, name: this.appName},
            );
            this.fs.copyTpl(
                this.templatePath('client/.*'),
                this.destinationRoot(),
                { filters }

            );
        }
        if (filters.db) {
            this.fs.copy(
                this.templatePath('services/db'),
                this.destinationPath('src/services/db')
            );
        }
        if (filters.auth) {
            this.fs.copy(
                this.templatePath('services/passport'),
                this.destinationPath('src/services/passport')
            );
        }
        if (filters.io) {
            this.fs.copy(
                this.templatePath('services/socket'),
                this.destinationPath('src/services/socket')
            );
        }
        if (filters.render) {
            this.fs.copy(
                this.templatePath('services/render'),
                this.destinationPath('src/services/render')
            );
        }
        if (filters.loadable) {
            this.fs.copy(
                this.templatePath('components/Loadable'),
                this.destinationPath('src/components/Loadable')
            );
        }

    }

    install() {
        const { filters } = this;
        const sass = filters.sass ? ['node-sass', 'sass-loader'] : [];
        const loadable = filters.loadable ? ['react-loadable'] : [];
        const loadableDev = loadable ? ['@babel/plugin-syntax-dynamic-import'] : [];
        if (filters.appType === 'client') {
            this.npmInstall([
                'react',
                'prop-types',
                'react-dom',
                'react-router',
                'react-router-dom'
            ].concat(loadable));

            this.npmInstall([
                '@babel/core',
                '@babel/plugin-syntax-object-rest-spread',
                '@babel/preset-env',
                '@babel/preset-react',
                'babel-eslint',
                'babel-loader',
                'css-hot-loader',
                'css-loader',
                'eslint',
                'eslint-config-airbnb',
                'eslint-loader',
                'eslint-plugin-import',
                'eslint-plugin-jsx-a11y',
                'eslint-plugin-react',
                'file-loader',
                'html-webpack-plugin',
                'terser-webpack-plugin',
                'jest',
                'react-testing-library',
                'identity-obj-proxy',
                'mini-css-extract-plugin',
                'style-loader',
                'optimize-css-assets-webpack-plugin',
                'webpack',
                'webpack-cli',
                'webpack-bundle-analyzer',
                'webpack-dev-server'

            ].concat(sass, loadableDev), { 'save-dev': true });
        }

        if (filters.appType === 'server') {
            this.npmInstall([
                'express',
                'ejs',
                'morgan'
            ]);
            this.npmInstall([
                'generate-json-webpack-plugin',
                'nodemon-webpack-plugin',
                'webpack-node-externals',
                'dotenv'
            ], { 'save-dev': true });
            this.npmInstall([
                '@babel/core',
                '@babel/plugin-syntax-object-rest-spread',
                '@babel/preset-env',
                'babel-eslint',
                'babel-loader',
                'eslint',
                'eslint-config-airbnb',
                'eslint-loader',
                'eslint-plugin-import',
                'eslint-plugin-jsx-a11y',
                'eslint-plugin-react',
                'file-loader',
                'jest',
                'identity-obj-proxy',
                'webpack',
                'webpack-cli',
                'webpack-bundle-analyzer'

            ], { 'save-dev': true });
        }

        if (filters.appType === 'fullstack') {
            this.npmInstall([
                'express',
                'ejs',
                'morgan',
                'axios'
            ]);

            this.npmInstall([
                'react',
                'prop-types',
                'react-dom',
                'react-router',
                'react-router-dom'
            ].concat(loadable));

            this.npmInstall([
                'generate-json-webpack-plugin',
                'nodemon-webpack-plugin',
                'webpack-node-externals',
                'dotenv',
                'raw-loader'
            ], { 'save-dev': true });

            this.npmInstall([
                '@babel/core',
                '@babel/plugin-syntax-object-rest-spread',
                '@babel/preset-env',
                '@babel/preset-react',
                'babel-eslint',
                'babel-loader',
                'css-hot-loader',
                'css-loader',
                'eslint',
                'eslint-config-airbnb',
                'eslint-loader',
                'eslint-plugin-import',
                'eslint-plugin-jsx-a11y',
                'eslint-plugin-react',
                'file-loader',
                'html-webpack-plugin',
                'terser-webpack-plugin',
                'jest',
                'react-testing-library',
                'identity-obj-proxy',
                'mini-css-extract-plugin',
                'style-loader',
                'optimize-css-assets-webpack-plugin',
                'webpack',
                'webpack-cli',
                'webpack-bundle-analyzer',
                'webpack-dev-server'

            ].concat(sass, loadableDev), { 'save-dev': true });
        }

        if (filters.db) {
            this.npmInstall([
                'connect-mongo',
                'express-session',
                'mongoose'
            ]);
        }

        if (filters.auth) {
            this.npmInstall([
                'bcrypt',
                'faker',
                'passport',
                'passport-local',
                'passport-facebook',
                'shortid'
            ]);
        }

        if (filters.io) {
            this.npmInstall([
                'socket.io',
                'socket.io-client'
            ]);
        }
    }

    end() {
        this.log(`You have finished building ${this.appName}.`);
    }
};
