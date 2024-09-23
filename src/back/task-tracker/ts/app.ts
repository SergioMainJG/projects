import { styleText, inspect } from 'node:util';

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
    //@ts-ignore
    console.log( styleText('red', 'hello world!') );

    inspect.colors.custom 
})();