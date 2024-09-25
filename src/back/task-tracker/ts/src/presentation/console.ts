import * as rlPromise from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { styleText } from 'node:util';

export const createQuestion = async ( message: string ): Promise<string> => {
    const consoleInteraction = rlPromise.createInterface({
        input: input,
        output: output,
        prompt: "Type here:-->"
    });

    const res = await consoleInteraction.question(`\n${message}\n`);
    consoleInteraction.close();
    return res;
};

export const createPause = () => {
    const consoleInteraction = rlPromise.createInterface({
        input: input,
        output: output,
        prompt: "Type here:-->"
    });
    consoleInteraction.question(ColorsText.bgGreen('Type any key to resume'));
    consoleInteraction.close();
    return;
};

export const clear = ( option: string ) =>{
    if ( option.trim().match(/^c(lear)?$/i) ) console.clear()
};

export const ColorsText = {
    bgBlue: ( message: string ) => styleText('bgBlue', message),
    bgBlueBright: ( message: string ) => styleText('bgBlueBright', message),
    bgCyan: ( message: string ) => styleText('bgCyan', message),
    bgCyanBright: ( message: string ) => styleText('bgCyanBright', message),
    bgGray: ( message: string ) => styleText('bgGray', message),
    bgGrey: ( message: string ) => styleText('bgGrey', message),
    bgGreen: ( message: string ) => styleText('bgGreen', message),
    bgGreenBright: ( message: string ) => styleText('bgGreenBright', message),
    bgMagenta: ( message: string ) => styleText('bgMagenta', message),
    bgMagentaBright: ( message: string ) => styleText('bgMagentaBright', message),
    bgRed: ( message: string ) => styleText('bgRed', message),
    bgRedBright: ( message: string ) => styleText('bgRedBright', message),
    bgWhite: ( message: string ) => styleText('bgWhite', message),
    bgWhiteBright: ( message: string ) => styleText('bgWhiteBright', message),
    bgYellow: ( message: string ) => styleText('bgYellow', message),
    bgYellowBright: ( message: string ) => styleText('bgYellowBright', message),
    black: ( message: string ) => styleText('black', message),
    blackBright: ( message: string ) => styleText('blackBright', message),
    blink: ( message: string ) => styleText('blink', message),
    blue: ( message: string ) => styleText('blue', message),
    blueBright: ( message: string ) => styleText('blueBright', message),
    bold: ( message: string ) => styleText('bold', message),
    cyan: ( message: string ) => styleText('cyan', message),
    cyanBright: ( message: string ) => styleText('cyanBright', message),
    dim: ( message: string ) => styleText('dim', message),
    doubleunderline: ( message: string ) => styleText('doubleunderline', message),
    framed: ( message: string ) => styleText('framed', message),
    gray: ( message: string ) => styleText('gray', message),
    grey: ( message: string ) => styleText('grey', message),
    green: ( message: string ) => styleText('green', message),
    greenBright: ( message: string ) => styleText('greenBright', message),
    hidden: ( message: string ) => styleText('hidden', message),
    inverse: ( message: string ) => styleText('inverse', message),
    italic: ( message: string ) => styleText('italic', message),
    magenta: ( message: string ) => styleText('magenta', message),
    magentaBright: ( message: string ) => styleText('magentaBright', message),
    overlined: ( message: string ) => styleText('overlined', message),
    red: ( message: string ) => styleText('red', message),
    redBright: ( message: string ) => styleText('redBright', message),
    reset: ( message: string ) => styleText('reset', message),
    strikethrough: ( message: string ) => styleText('strikethrough', message),
    underline: ( message: string ) => styleText('underline', message),
    white: ( message: string ) => styleText('white', message),
    whiteBright: ( message: string ) => styleText('whiteBright', message),
    yellow: ( message: string ) => styleText('yellow', message),
    yellowBright: ( message: string ) => styleText('yellowBright', message),
};