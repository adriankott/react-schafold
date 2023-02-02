/**
 * argsValidate - Check arguments
 *
 * @param {array} args  Description
 * @param {array} types Description
 *
 * @return {boolean} Description
 */
export const argsValidate = (args, types) => {
    const validate = args.filter((arg, index) => typeof arg === types[index]);
    return args.length === validate.length;
};

export const showHelp = () => {
    return (`TODO write help`);
};

export const sanitize = (text) => {
    if (!text || !text.length) {
        return '';
    }

    return text.replace(/[^\w_-]/gi, '');
};

export const resolveTemplatePath = (templatePath, processPWD) => {
    let path = templatePath;

    if (!path) {
        return path;
    }

    if (path.startsWith('./')) {
        path = path.replace('.', processPWD);
    } else if (path.startsWith('.')) {
        path = path.replace('.', processPWD + '/');
    }

    if (!path.startsWith('/')) {
        path = processPWD + '/' + path;
    }

    return path;
};
