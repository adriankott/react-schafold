#! /usr/bin/env node
import fs from "fs";

import chalk from "chalk";

import minimist from "minimist";
import {argsValidate, createDirIfNotExists, resolveTemplatePath, sanitize} from "../helpers/functions.js";
import {componentDefault} from "../templates/component.default.js";
import {componentModuleScss} from "../templates/component.module.scss.js";


// const reactTemplate = require('../helpers/template-react');

const argv = minimist(process.argv.slice(2));
const log = console.log;
let help = argv.help, name = argv.name, template = sanitize(argv.template),
    templatePath = resolveTemplatePath(argv.templatePath, process.env.PWD),
    css = (argv.css && argv.css.length) ? sanitize(argv.css) : argv.css;
const pathSplit = name.split('/');
name = pathSplit.pop();
const path = pathSplit.join('/');
if (path) {
    createDirIfNotExists(path);
}
const location = path ? path : `.`, reactFileName = `${location}/${name}`;

const DEFAULT_JS_EXTENSION = '.tsx';
const DEFAULT_CSS_EXTENSION = '.module.scss';

if (!name) {
    log(chalk.red('--name argument is mandatory!!!! and must be a word found:'));
    log(chalk.red(argv.name));
    process.exit(0);
}

const generate = () => {
    fs.readdir(location, () => initScaffold());
};

function reactTemplate(namePascalCase, template, templatePath, param4) {

}

const initScaffold = () => {
    const namePascalCase = pascalCase(name);
    const cssFileName = ((css && css.length) ? css : name).toLowerCase();
    let templateOutput = '';
    try {
        templateOutput = componentDefault(namePascalCase)
    } catch (e) {
        if (e.message.match(/\/\/ Template(.)+ was not found/)) {
            templateOutput = e.message;
        }
    }

    createFile(`${namePascalCase}${DEFAULT_JS_EXTENSION}`, templateOutput);
    createFile(`${namePascalCase}${DEFAULT_CSS_EXTENSION}`, componentModuleScss());
};

const createFile = (fileName, content) => {
    fs.appendFile(`${location}/${fileName}`, content, (error) => {
        if (error) {
            log(chalk.red(error));
        } else {
            log(chalk.green(`Added ${location}/${fileName} file`));
        }
    });
};

const pascalCase = (string) => {
    return string.replace(/(\b[a-zA-Z])/g, (g) => (g.toUpperCase())).replace(/(\b[-])/g, '');
};
//
// if (help) {
//     log(showHelp());
//     return 0;
// }

if (!fs.existsSync(reactFileName + DEFAULT_JS_EXTENSION)) {
    if (argsValidate([name], ['string'])) {
        generate();
    } else {
        log(chalk.red('Argument "name" is required.'));
    }
} else {
    log(chalk.red('That file already exists, please choose another name.'));
}