import { styleText } from 'node:util';

( () => {
    console.log(`${styleText("blueBright", "¡HOLA DESDE")} ${styleText("redBright", "TU FUNCIÓN")} ${styleText("magentaBright", "AUTOINVOCADA!")}`);
})();