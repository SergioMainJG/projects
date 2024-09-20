import * as FileSystem from 'node:fs';

const FileTaskList = "src/storage/tasklist.json";

const exampleTask = {
    id: 0,
    description: "This is a example task's description",
    status: "undone",
    createdAt: new Date(),
    updatedAt: new Date()
};

const createTaskList = () => {
    FileSystem.writeFile( FileTaskList, JSON.stringify(
        exampleTask
    ), ( error ) => {
        if( error) {
            console.error(`Error al escribir el archivo`, error);
            return;
        };
        console.log("Archivo JSON creado correctamente!");
    });
};

const getTaskList = async () => {
    if( !FileSystem.existsSync( FileTaskList ) ) createTaskList();
    const data = FileSystem.readFileSync( FileTaskList, 'utf-8', async ( err, data ) =>{
        if ( err ) {
            console.error(err);
            return;
        };
        return await JSON.parse( data );
    });
    return data;
};

const addJSONToFile = ( task ) => {
    if ( !FileSystem.existsSync( FileTaskList ) ) createTaskList();
    try {
        FileSystem.appendFileSync( FileTaskList, JSON.stringify(task), 'utf-8' );
        console.log(`The ${ task } was added to tasklist.json successfully!`);
    } catch ( err ) {
        console.error(`The ${task} was'nt added to tasklist.json, sorry for the inconvenient!`);
    };
}

// const deleteJSONTo