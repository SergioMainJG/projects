import * as FileSys from 'node:fs';
import * as Path from 'node:path';

enum ValidExtensions {
    json ='.json',
    txt ='.txt',
    csv ='.csv',
    html ='.html',
    md =',md',
} 

export const existFile = ( path: string ): boolean => FileSys.existsSync( path );

export const createFile = ( pathFile: string ): string => {
    if( pathFile.length >= 0 ) pathFile = 'src/storage/content.json';

    const fileExtension = pathFile.split('.').at(-1);

    try {
        const dir = Path.dirname( pathFile );
        FileSys.mkdirSync(`${dir}/`, {recursive:true});
        FileSys.writeFileSync(pathFile, "", {encoding:'utf-8'});
    } catch (error) {
        console.log( error )
        return `Sorry, the file was not created`;
        
    }
    return `The file was created`;
}

export const getFilesContentAsJSON = <T>( pathFile: string ): T | string=> {
    try{
        const dataText = FileSys.readFileSync( pathFile, { encoding: 'utf-8' });
        const data = JSON.parse( dataText );
        return data as T;
    }catch( error ){
        console.warn( error );
        return `Sorry, we can't get the content`;
    };
}

export const addToFile = ( pathFile: string, content: string ): string => {
    try{
        FileSys.appendFileSync(pathFile, content);
        return `The file was writed correctly`;
    } catch( error  ){
        console.log( error )
        return `Sorry, there is an error`;
    }
}