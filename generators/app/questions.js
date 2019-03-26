const utils = require('./utils');
const questions = [
    {
        type: 'list',
        name: 'appType',
        message: 'use app for',
        choices: [
            {
                value: 'fullstack',
                name: 'Fullstack'
            },
            {
                value: 'client',
                name: 'Client'
            },
            {
                value: 'server',
                name: 'Server'
            }
        ]
    },
    {
        type: 'confirm',
        name: 'sass',
        message: 'Would you like to use sass?',
        default: true,
        when: answers => utils.isClient(answers) || utils.isFullstack(answers)
    },
    {
        type: 'confirm',
        name: 'loadable',
        message: 'Would you like loadable components with code split?',
        default: true,
        when: answers => utils.isFullstack(answers) || utils.isClient(answers)
    },
    {
        type: 'confirm',
        name: 'render',
        message: 'Would you like server side rendering?',
        default: true,
        when: answers => utils.isFullstack(answers)
    },
    {
        type: 'confirm',
        name: 'db',
        message: 'Would you like to use MongoDB?',
        when: answers => utils.isFullstack(answers) || utils.isServer(answers)
    },
    {
        type: 'confirm',
        name: 'auth',
        message: 'Would you scaffold out an authentication boilerplate?',
        when: answers => answers.db
    },
    {
        type: 'checkbox',
        name: 'oauth',
        message: 'Would you like to include additional oAuth strategies?',
        when: answers => answers.auth,
        choices: [
            {
                value: 'googleAuth',
                name: 'Google',
                checked: true
            },
            {
                value: 'facebookAuth',
                name: 'Facebook',
                checked: true
            },
            {
                value: 'twitterAuth',
                name: 'Twitter',
                checked: true
            }]
    },
    {
        type: 'confirm',
        name: 'io',
        message: 'Would you like to use SocketIO?',
        default: true,
        when: answers => utils.isFullstack(answers) || utils.isServer(answers)
    }
];

module.exports = questions;
