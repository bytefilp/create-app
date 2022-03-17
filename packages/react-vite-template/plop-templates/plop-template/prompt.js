/**
 * 基础模板配置文件
 * @type {import("node-plop").PlopGeneratorConfig}
 */
const config = {
    description: 'Generate plop template',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Template file name'
        }
    ],
    actions: [
        {
            type: 'add',
            path: 'plop-template/{{kebabCase name}}/index.hbs',
            template: ''
        },
        {
            type: 'add',
            path: 'plop-template/{{kebabCase name}}/prompt.js',
            templateFile: 'plop-template/plop-template/index.hbs'
        },
        {
            type: 'append',
            pattern: /\/\/ #auto-import/,
            path: 'plopfile.js',
            template: '    plop.setGenerator(\'plop-template\', require(\'./plop-template/{{kebabCase name}}/prompt\'));'
        }
    ]
};

module.exports = config;
