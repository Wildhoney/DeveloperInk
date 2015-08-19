(function main($export) {

    const fs         = require('fs');
    const path       = require('path');
    const Handlebars = require('Handlebars');

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
     * @param {String} [version]
     * @return {String}
     */
    const inkFile = function inkFile(filename, version) {
        const filePath = path.normalize(`${__dirname}/ink/${version || DEFAULT_VERSION}/${filename}`);
        return fs.readFileSync(filePath, 'UTF-8');
    };

    /**
     * @method buildFile
     * @param {String} filename
     * @return {String}
     */
    const buildFile = function buildFile(filename) {
        const filePath = path.normalize(`${__dirname}/build/${filename}`);
        return fs.readFileSync(filePath, 'UTF-8');
    };

    /**
     * @method templateFile
     * @param {String} filename
     * @return {String}
     */
    const templateFile = function templateFile(filename) {
        const filePath = path.normalize(`${CURRENT_DIRECTORY}/${filename}`);
        return fs.readFileSync(filePath, 'UTF-8');
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
         * @method getRenderedTemplate
         * @param {String} [version]
         * @return {String}
         */
        getRenderedTemplate: function getRenderedTemplate(version) {

            const inkFiles      = this.getInkFiles(version);
            const template      = Handlebars.compile(inkFiles.index);
            const templateFiles = this.getTemplateFiles();

            return template({ css: [inkFiles.css, templateFiles.css].join('\n'), template: templateFiles.index });

        }

    };

    $export.devInk = new DevInk();

})(module.exports);