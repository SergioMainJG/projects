import * as FileSysPromises from 'node:fs/promises';
// import * as FileSys from 'node:fs';
import * as testing from 'bun:test';
import * as Path from 'node:path';

import {
    ValidExtensions,
    existFile,
    areValidExtensions,
    createFile,
    getFilesContentFromJSONFiles,
    addToJSONsFile,
} from '@store.management';

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(
        resolve, ms));
}

testing.describe('Testing for src/store/store.managemente.ts ', async () => {

    testing.afterAll( () => {
        testing.jest.restoreAllMocks();
    });

    interface IHelloWorld {
        propertie1: string;
        propertie2: string;
        propertie3: string;
        propertie4: string;
        propertie5: string;
        propertie6: string;
    }

    const Extensions = ["json", "txt", "csv", "html", "md"];

    testing.test('Expect existFile return a value like IValidationMessage with existent file with a awaited values ', async () => {
        
        const pathTest = 'test/store/store.management.test.ts';
        const isExist = await existFile( pathTest );

        testing.expect( typeof isExist ).toBe('object');
        testing.expect( isExist.isValid ).toBeTruthy();
        testing.expect( isExist.message ).toBe(`This path: ${ pathTest } exist!`);
        testing.expect( typeof isExist.message ).toBe(`string`);
    });

    testing.test('Expect existFile return a value like IValidationMessage with inexistent file with a awaited values ', async () => {
        
        const pathTest = 'public/holamundo.txt';
        const isExist = await existFile( pathTest );

        testing.expect( typeof isExist ).toBe('object');
        testing.expect( isExist.isValid ).toBeFalsy();
        testing.expect( isExist.message ).toBe(`This path are not exist! ${ pathTest }`);
        testing.expect( typeof isExist.message ).toBe(`string`);
    });

    testing.test('Expect ValidExtensions only had: .json, .txt, .csv, .html, .md', () => {
        Extensions.forEach( ( extension, i ) => {
            testing.expect( extension ).toBe( ValidExtensions[i] );
        });

        testing.expect( Extensions.length ).toBe( ValidExtensions.length );
    });

    testing.test('Expect ValidExtensions are freeze', () => {
        const test = 'value test';
        testing.expect( () => ValidExtensions.push(test) ).toThrowError();
    });

    testing.test('Expect areValidExtensions return a value like IValidationMessage with a valid extension with the waited values', () => {

        Extensions.forEach( (extension) => {
            const pathTesting = `test.${extension}`;
            const likeIValidationMessage = areValidExtensions(pathTesting);
            
            testing.expect( typeof likeIValidationMessage ).toBe('object');
            testing.expect( likeIValidationMessage.isValid ).toBeTruthy();
            testing.expect( likeIValidationMessage.message ).toEqual(`This ${ pathTesting } are ok!`)
            testing.expect( typeof likeIValidationMessage.message ).toBeString();
        });
    });

    testing.test('Expect areValidExtensions return a value like IValidationMessage with a invalid extension with the waited values', () => {

        const InvalidExtension = [ 'jar', 'exe', 'vue', 'jsx', 'tsx', 'pug'];

        InvalidExtension.forEach( (extension) => {
            const pathTesting = `test.${extension}`;
            const likeIValidationMessage = areValidExtensions(pathTesting);
            
            testing.expect( typeof likeIValidationMessage ).toBe('object');
            testing.expect( likeIValidationMessage.isValid ).toBeFalsy();
            testing.expect( likeIValidationMessage.message ).toEqual(`Invalid file extension. Allowed extensions are: ${ ValidExtensions.join(',') }`);
            testing.expect( typeof likeIValidationMessage.message ).toBeString();
        });
    });

    testing.test('Expect areValidExtensions return a value like IValidationMessage with inexistent file with the waited values', () => {

        const pathTesting = `test`;
        const likeIValidationMessage = areValidExtensions(pathTesting);
        
        testing.expect( typeof likeIValidationMessage ).toBe('object');
        testing.expect( likeIValidationMessage.isValid ).toBeFalsy();
        testing.expect( likeIValidationMessage.message ).toEqual(`There is not a file in the path file ${ pathTesting }`);
        testing.expect( typeof likeIValidationMessage.message ).toBeString();
    });

    ( async () => {
        await FileSysPromises.rmdir('public/', {recursive:true});
    })();

    await sleep(2000);

    testing.test('Expect createFile return a Return<string>.Success with a inexistent path and create a new File', async () => {

        const pathTest = 'public/target/text.txt';

        const wasCreated = await createFile( pathTest );

        testing.expect( typeof wasCreated ).toBe('object');
        testing.expect( wasCreated.value ).toBe(`The file was created successfully. You can write and append content in: ${pathTest}`);
        testing.expect( wasCreated.isSucces ).toBeTruthy();
        testing.expect( wasCreated.Error ).toBeNull();
        testing.expect( FileSysPromises.exists( pathTest ) ).toBeTruthy();
    });
    
    testing.test('Expect createFile return a Return<string>.Failure with a existent path', async () => {

        const pathTest = 'public/target/text.txt';

        const wasCreated = await createFile( pathTest );

        testing.expect( typeof wasCreated ).toBe('object');
        testing.expect( wasCreated.value ).toBeUndefined();
        testing.expect( wasCreated.isSucces ).toBeFalsy();
        testing.expect( wasCreated.Error ).toBe(`Error: The file in ${pathTest} already exist!`);
    });

    testing.test('Expect createFile return a Return<string>.Success with a existent dir but with not a existent file', async () => {

        const pathTest = 'public/target/text2.txt';


        const wasCreated = await createFile( pathTest );

        testing.expect( typeof wasCreated ).toBe('object');
        testing.expect( wasCreated.value ).toBe(`The file was created successfully. You can write and append content in: ${pathTest}`);
        testing.expect( wasCreated.isSucces ).toBeTruthy();
        testing.expect( wasCreated.Error ).toBeNull();
        testing.expect( FileSysPromises.exists( pathTest ) ).toBeTruthy();
    });

    testing.test('Expect createFile return a Result<string>.Failure with a invalid extension', async () => {

        const pathTest = 'public/target/text.asda';

        const wasCreated = await createFile( pathTest );

        testing.expect( typeof wasCreated ).toBe('object');
        testing.expect( wasCreated.value ).toBeUndefined();
        testing.expect( wasCreated.isSucces ).toBeFalsy();
        testing.expect( wasCreated.Error ).toBe(`The file: ${ pathTest } not content a valid extension, please use the next: \n${ ValidExtensions.join(', ') }`);
    });
    
    testing.test('Expect getFilesContentFromJSONFiles return a Result.Succes with the awaited values', async () => {

        const data = await getFilesContentFromJSONFiles<IHelloWorld[]>('hello.json');
        const { value, isSucces, Error } = data;

        value?.forEach( ( obj ) => {
            testing.expect( obj ).toBeObject();
            for (const propertie in obj) {
                testing.expect( propertie ).toBeString();
            };
        });

        testing.expect( isSucces ).toBeTruthy();
        testing.expect( Error).toBeNull();
    });

    testing.test('Expect getFilesContentFromJSONFiles return a Result.Failure when a the file not exist', async () => {
        
        const fileTest = 'ImNotExist';

        const data = await getFilesContentFromJSONFiles(fileTest);

        testing.expect( data.value ).toBeUndefined();
        testing.expect( data.isSucces ).toBeFalsy();
        testing.expect( data.Error ).toBe(`The file not exist! Please amend the path file: ${ fileTest } `);
    });

    testing.test('Expect getFilesContentFromJSONFiles return a Result.Failure when a the file have a invalid extension', async () => {
        
        const fileTest = 'test.vue';
        const data = await getFilesContentFromJSONFiles(fileTest);

        testing.expect( (await existFile( fileTest )).isValid ).toBeTruthy();
        testing.expect( data.value ).toBeUndefined();
        testing.expect( data.isSucces ).toBeFalsy();
        testing.expect( data.Error ).toBe(`The file had a extension not supportable: ${ Path.basename( fileTest ) }; please, use other file with the next extension: .${ ValidExtensions.find( (ext) => ext === 'json' ) }`);
    });

    testing.test('Expect addToJSONsFile append content a file and return a Result.Success with te awaited values', async () => {
        const fileTest = 'hello2.json';
        const contentTest: IHelloWorld = {
            propertie1: 'qwe',
            propertie2: 'asd',
            propertie3: 'zxc',
            propertie4: 'oik',
            propertie5: 'yhf',
            propertie6: 'psd'
        
        };

        const contentAsString = JSON.stringify( contentTest );
        const isAppend = await addToJSONsFile(fileTest, contentAsString );
        const { Error, isSucces, value } = isAppend;

        testing.expect( value ).toBe("The file was written correctly");
        testing.expect( isSucces ).toBeTruthy();
        testing.expect( Error ).toBeNull();

    });
    
    testing.test('Expect addToJSONsFile return a Result.Failure with te awaited values when the file not exist', async () => {
        const fileTest = 'hello3.json';
        const contentTest: IHelloWorld = {
            propertie1: 'qwe',
            propertie2: 'asd',
            propertie3: 'zxc',
            propertie4: 'oik',
            propertie5: 'yhf',
            propertie6: 'psd'
        
        };

        testing.expect( (await existFile( fileTest )).isValid ).toBeFalsy();
    
        const isAppend = await addToJSONsFile( fileTest, JSON.stringify( contentTest ));

        testing.expect( isAppend.Error ).toBe("The file does not exist! Please amend the path: hello3.json");
        testing.expect( isAppend.isSucces ).toBeFalsy();
        testing.expect( isAppend.value ).toBeUndefined();
    });
    
    testing.test('Expect addToJSONsFile return a Result.Failure with te awaited values when the file have a invalid extension', async () => {
        const fileTest = 'test.vue';
        const contentTest: IHelloWorld = {
            propertie1: 'qwe',
            propertie2: 'asd',
            propertie3: 'zxc',
            propertie4: 'oik',
            propertie5: 'yhf',
            propertie6: 'psd'
        
        };

        testing.expect( (await existFile( fileTest )).isValid ).toBeTruthy();
        
        const isAppend = await addToJSONsFile( fileTest, JSON.stringify( contentTest ));
        
        testing.expect( isAppend.Error ).toBe("The file has an unsupported extension: test.vue; please use a file with the following extensions: \njson,txt,csv,html,md");
        testing.expect( isAppend.isSucces ).toBeFalsy();
        testing.expect( isAppend.value ).toBeUndefined();
    });
    
    testing.test('Expect addToJSONsFile return a Result.Failure with te awaited values when the content passed are void', async () => {
        const fileTest = 'hello2.json';
        const contentTest = {};
        
        testing.expect( (await existFile( fileTest )).isValid ).toBeTruthy();

        const contentAsString = JSON.stringify( contentTest );
        const isAppend = await addToJSONsFile(fileTest, contentAsString );
        const { Error, isSucces, value } = isAppend;

        testing.expect( Error ).toBe("There is no content, please provide content to append");
        testing.expect( isSucces ).toBeFalsy();
        testing.expect( value ).toBeUndefined();
    });

    testing.test('Expect addToJSONsFile return a Result.Failure with te awaited values when the file not contain an array of JSON', async () => {
        const fileTest = 'nonarray.json';
        const contentTest: IHelloWorld = {
            propertie1: 'qwe',
            propertie2: 'asd',
            propertie3: 'zxc',
            propertie4: 'oik',
            propertie5: 'yhf',
            propertie6: 'psd'
        
        };
        
        testing.expect( (await existFile( fileTest )).isValid ).toBeTruthy();

        const contentAsString = JSON.stringify( contentTest );
        const isAppend = await addToJSONsFile(fileTest, contentAsString );
        const { Error, isSucces, value } = isAppend;

        testing.expect( Error ).toBe("The file content is not in a valid JSON array format");
        testing.expect( isSucces ).toBeFalsy();
        testing.expect( value ).toBeUndefined();
    });
    
});
