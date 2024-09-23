import * as FileSysPromises from 'node:fs/promises';
import * as Path from 'node:path';

import { Result } from '@util/validator.rp';

export interface IValidationMessage{
    message: string;
    isValid: boolean;
};

export const ValidExtensions =  [
    'json',
    'txt',
    'csv',
    'html',
    'md',
];
Object.freeze( ValidExtensions );

export const existFile = async ( path: string ): Promise<IValidationMessage> => {
    return !( await FileSysPromises.exists( path ))
    ? { message: `This path are not exist! ${ path }`, isValid: false}
    : { message: `This path: ${ path } exist!`, isValid: true};
};

export const areValidExtensions = ( pathFile: string ): IValidationMessage => {
    const fileExtension = Path.extname(pathFile).substring(1);

    if( !fileExtension ){
        return {
            message: `There is not a file in the path file ${ pathFile }`,
            isValid: false
        };
    };
    if (!ValidExtensions .includes( fileExtension ) ) {
        return {
            message: `Invalid file extension. Allowed extensions are: ${ ValidExtensions.join(',') }`,
            isValid: false
            };
    };
    return {
        message: `This ${ pathFile } are ok!`,
        isValid: true,
    };
};
export const createFile = async (pathFile: string): Promise<Result<string>> => {
    if (!areValidExtensions(pathFile).isValid) {
        return Result.Failure(`The file: ${pathFile} not content a valid extension, please use the next: \n${ValidExtensions.join(', ')}`);
    }

    if ((await existFile(pathFile)).isValid) {
        return Result.Failure(`Error: The file in ${pathFile} already exist!`);
    }

    const directory = Path.dirname(pathFile);

    try {
        await FileSysPromises.mkdir(directory, { recursive: true });
        await FileSysPromises.writeFile(pathFile, '', { encoding: 'utf-8' });
    } catch ( error ) {
        return Result.Failure(`Error: The file in ${pathFile} can't be created. ${ error }`);
    }

    if (!(await existFile(pathFile)).isValid) {
        return Result.Failure(`Error: The file in ${pathFile} wasn't created`);
    }

    return Result.Success(`The file was created successfully. You can write and append content in: ${pathFile}`);
};
export const getFilesContentFromJSONFiles = async <T>( pathFile: string ): Promise<Result<T>>=> {
    if( !( await existFile( pathFile )).isValid ) return Result.Failure(`The file not exist! Please amend the path file: ${ pathFile } `);
    if( !(Path.extname( pathFile ).substring(1) === 'json')  ) return Result.Failure(`The file had a extension not supportable: ${ Path.basename( pathFile ) }; please, use other file with the next extension: .${ ValidExtensions.find( (ext) => ext === 'json' ) }`);
    try{
        const dataText = await FileSysPromises.readFile( pathFile, { encoding: 'utf-8' });
        const data = await JSON.parse(  dataText );
        return Result.Success( data as T );
    }catch( error ){
        return Result.Failure(`${error}`);
    };
};
export const addToJSONsFile = async <T>(pathFile: string, content: string): Promise<Result<T|string>> => {
    if (!(await existFile(pathFile)).isValid) return Result.Failure(`The file does not exist! Please amend the path: ${pathFile}`);
    if (!areValidExtensions(pathFile).isValid) return Result.Failure(`The file has an unsupported extension: ${Path.basename(pathFile)}; please use a file with the following extensions: \n${ValidExtensions.join(',')}`);
    if (content.length <= 2 ) return Result.Failure(`There is no content, please provide content to append`);

    try {
        const data = await getFilesContentFromJSONFiles<T[]>(pathFile);

        if (data.value && Array.isArray(data.value)) {
            const parsedContent = JSON.parse(content);
            data.value.push(parsedContent);
    
            await FileSysPromises.writeFile(pathFile, JSON.stringify(data.value, null, 2), 'utf-8');
            return Result.Success(`The file was written correctly`);
        } else {
            return Result.Failure(`The file content is not in a valid JSON array format`);
        }
    } catch (error) {return Result.Failure(`Error: Unable to append content to ${pathFile}; ${error}`);}
};
