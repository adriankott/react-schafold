#! /usr/bin/env node
import fs from "fs";

import chalk from "chalk";

import minimist from "minimist";
import {argsValidate, resolveTemplatePath, sanitize} from "../helpers/functions.js";


// const reactTemplate = require('../helpers/template-react');

const argv = minimist(process.argv.slice(2));
const log = console.log;
const
    help = argv.help,
    name = sanitize(argv.name),
    template = sanitize(argv.template),
    templatePath = resolveTemplatePath(argv.templatePath, process.env.PWD),
    css = (argv.css && argv.css.length) ? sanitize(argv.css) : argv.css;
const
    location = `.`,
    reactFileName = `${location}/${name}`;

const DEFAULT_JS_EXTENSION = '.js';
const DEFAULT_CSS_EXTENSION = '.css';

if (!name) {
    log(chalk.red('--name argument is mandatory!!!!'));
    console.log(chalk.green(JSON.stringify(argv)))
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
        templateOutput = "";
        reactTemplate(namePascalCase, template, templatePath, css ? cssFileName : '');
    } catch (e) {
        if (e.message.match(/\/\/ Template(.)+ was not found/)) {
            templateOutput = e.message;
        }
    }

    createFile(`${name}${DEFAULT_JS_EXTENSION}`, templateOutput);

    if (css) {
        createFile(`${cssFileName}${DEFAULT_CSS_EXTENSION}`, `.${name} { }`);
    }
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
    return string.replace(/(\b[a-zA-Z])/g, (g) => (
        g.toUpperCase()
    )).replace(/(\b[-])/g, '');
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