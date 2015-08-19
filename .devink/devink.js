(function main($export) {

    const fs           = require('fs');
    const path         = require('path');
    const yaml         = require('js-yaml');
    const Styliner     = require('styliner');
    const Handlebars   = require('Handlebars');
    const nodemailer   = require('nodemailer');
    const htmlToText   = require('nodemailer-html-to-text').htmlToText;
    const htmlMinifier = require('html-minifier').minify;

    /**
     * @constant DEFAULT_VERSION
     * @type {String}
     */
    const DEFAULT_VERSION = '1.0.5';

    /**
     * @constant CURRENT_DIRECTORY
     * @type {String}
     */
    const CURRENT_DIRECTORY = `${__dirname}/../templates/.current`;

    /**
     * @method inkFile
     * @param {String} filename
     * @param {String} [version=DEFAULT_VERSION]
     * @return {String}
     */
    const inkFile = function inkFile(filename, version) {
        const filePath = path.normalize(`${__dirname}/ink/${version || DEFAULT_VERSION}/${filename}`);
        return fs.readFileSync(filePath, 'utf8');
    };

    /**
     * @method buildFile
     * @param {String} filename
     * @return {String}
     */
    const buildFile = function buildFile(filename) {
        const filePath = path.normalize(`${__dirname}/build/${filename}`);
        return fs.readFileSync(filePath, 'utf8');
    };

    /**
     * @method templateFile
     * @param {String} filename
     * @return {String}
     */
    const templateFile = function templateFile(filename) {
        const filePath = path.normalize(`${CURRENT_DIRECTORY}/${filename}`);
        return fs.readFileSync(filePath, 'utf8');
    };

    /**
     * @module DevInk
     * @constructor
     */
    const DevInk = function DevInk() {};

    /**
     * @property prototype
     * @type {Object}
     */
    DevInk.prototype = {

        /**
         * @method getInkFiles
         * @return {Object}
         */
        getInkFiles: function getInkFiles() {

            return {
                index: inkFile('boilerplate.html'),
                css: inkFile('ink.css')
            };

        },

        /**
         * @method getTemplateFiles
         * @return {Object}
         */
        getTemplateFiles: function getTemplateFiles() {

            return {
                index: templateFile('index.html'),
                css: buildFile('default.css')
            };

        },

        /**
         * @method getCurrent
         * @return {String}
         */
        getCurrent() {
            return path.normalize(CURRENT_DIRECTORY);
        },

        /**
         * @method renderTemplate
         * @param {String} [version=DEFAULT_VERSION]
         * @return {String}
         */
        renderTemplate: function renderTemplate(version) {

            const inkFiles      = this.getInkFiles(version);
            const template      = Handlebars.compile(inkFiles.index);
            const templateFiles = this.getTemplateFiles();
            const styliner      = new Styliner(this.getCurrent(), { compact: true, fixYahooMQ: true });

            return new Promise(function(resolve) {

                const templateHtml = template({ css: [inkFiles.css, templateFiles.css].join('\n'), template: templateFiles.index });
                const minifiedHtml = htmlMinifier(templateHtml, { collapseWhitespace: true, minifyCSS: true });

                styliner.processHTML(minifiedHtml).then(function(html) {
                    resolve(html);
                }.bind(this));

            });

        },

        /**
         * @method sendTemplate
         * @param {String} [version=DEFAULT_VERSION]
         */
        sendTemplate: function sendTemplate(version) {

            const configPath = path.normalize(fs.readFileSync(`${__dirname}/../config.yml`, 'utf8'));
            const config     = yaml.safeLoad(configPath, 'utf8').mail;

            const transporter = nodemailer.createTransport({
                service: config.provider,
                auth: {
                    user: config.email,
                    pass: config.password
                }
            });

            transporter.use('compile', htmlToText());

            this.renderTemplate(version).then(function(template) {

                const mailOptions = {
                    from: config.email,
                    to: config.recipients.join(' '),
                    subject:config.subject,
                    html: template
                };

                transporter.sendMail(mailOptions, function(error, info) {

                    if (error) {
                        return console.log(error);
                    }

                    console.log('Message sent: ' + info.response);

                });

            });

        }

    };

    $export.devInk = new DevInk();

})(module.exports);