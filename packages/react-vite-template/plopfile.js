module.exports = function (plop) {
    plop.setWelcomeMessage('What needs to be generated: ');
    plop.setGenerator('plop-template', require('./plop-template/plop-template/prompt'));
    // #auto-import
};
