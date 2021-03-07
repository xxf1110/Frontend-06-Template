var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        // this.option('babel'); // This method adds support for a `--babel` flag
    }
    async initPackage() {
        const answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            }
        ]);
        const pkgJson = {
            name: answers.name,
            main: 'src/index.js',
            scripts: {
                "build": "webpack",
                "test": "mocha --require @babel/register",
                "coverage": "nyc mocha --require @babel/register"
            },
            devDependencies: {
            },
            dependencies: {
            }
        };

        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall(['vue'], { 'save-dev': false })
        this.npmInstall([
            'webpack',
            'vue-loader',
            'vue-loader',
            'vue-template-compiler',
            'css-loader',
            'vue-style-loader',
            'copy-webpack-plugin',
            'mocha',
            'nyc',
            'babel-loader',
            "@babel/core",
            "@babel/preset-env",
            "@babel/register",
            "@istanbuljs/load-nyc-config",
            "babel-plugin-istanbul",
            "webpack-cli",
            "babel-preset-env",
        ], { 'save-dev': true })

        this.fs.copyTpl(
            this.templatePath('helloworld.vue'),
            this.destinationPath('src/helloworld.vue'),
        );
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js'),
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js'),
        );
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html'),
            {
                title: answers.name
            }
        );
        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc'),
        );
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc'),
        );
        this.fs.copyTpl(
            this.templatePath('test.js'),
            this.destinationPath('test/test.js'),
        );
    }

};