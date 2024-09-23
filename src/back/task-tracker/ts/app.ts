import { styleText } from 'node:util';
import * as FileSysPromises from 'node:fs/promises';

( async () => {
    console.log(`${styleText("blueBright", "¡HOLA DESDE")} ${styleText("redBright", "TU FUNCIÓN")} ${styleText("magentaBright", "AUTOINVOCADA!")}`);
    //! console.log(`${ existFile('src/storage/task-store.json') }`);
    //! console.log(`${ createFile('src/storage/task-store.json')}`);
    //! console.log(`${ existFile('src/storage/task-store.json') }`);
    //! console.log(`${ writeFile("src/storage/task-store.json", JSON.stringify(
    //!     {hello: "world"}
    //! ))}`)
    //! interface IContent {
    //!     hello: string
    //! }
    //! const content = <IContent>getFilesContentAsJSON("src/storage/task-store.json");
    //! console.log(`${content.hello}`)
    console.log( await FileSysPromises.exists('README.md') );
})();