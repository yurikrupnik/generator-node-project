function isClient(answers) {
    return answers.appType === 'client';
}

function isServer(answers) {
    return answers.appType === 'server';
}

function isFullstack(answers) {
    return answers.appType === 'fullstack';
}

module.exports = {
    isClient,
    isServer,
    isFullstack
};
