import * as ReadLine from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { styleText } from 'node:util';

const descriptions = [
    `Add Task`,
    `Update Task`,
    `Delete Task`,
    `Mark as done`,
    `Mark as in progress`,
    `List all tasks`,
    `List all tasks that are done`,
    `List all tasks that are not done`,
    `List all tasks that are in progress`,
];

const options = () => {
    const messages = [];
    for (let i = 1; i <= 9; i++) {
        messages.push(
            `${styleText('greenBright', `${i}.-`)} ${styleText(['bgWhite', 'blueBright'], ` ${descriptions[i-1]} `)}`
        );
    };
    
    for (const message of messages) {
        console.log( message );
    }
};

export const showMenu = ( ) => {
    return new Promise( res => {
        console.log(styleText('redBright', 'Select a option, please\n'));
        options();
        console.log('');
        const readline = ReadLine.createInterface({
            input: input,
            output: output,
            prompt: 'Write here:=>'
        });
        readline.question('Select an option, please: ', opt => {
            readline.close();
            res(opt);
        });
    }); 
};

export const pausa = () => {
    return new Promise( res => {
        const readline = ReadLine.createInterface({
            input: input,
            output: output,
            prompt: 'Write here:=>'
        });
        readline.question(`\nPresione ${ styleText('red', `ENTER`) } para continuar\n`, opt => {
            readline.close();
            res();
        });
    });
};

export const giveValueToFunctions = ( message ) => {
    return new Promise( res => {
        const readline = ReadLine.createInterface({
            input: input,
            output: output,
            prompt: 'Write here:=>'
        });
        readline.question(`\n${message}:\n`, opt => {
            readline.close();
            res(opt);
        });
    });
};