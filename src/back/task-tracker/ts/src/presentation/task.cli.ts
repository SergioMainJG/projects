import * as FileSysPromises from 'node:fs/promises';
import * as rlPromise from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { type ITasks, type ITasksMsg, ManageTaskList, type TStatus, } from '@task.ds';
import { type IValidationMessage, ValidExtensions, addToJSONsFile, areValidExtensions, createFile, existFile, getFilesContentFromJSONFiles } from '@store.management';
import { clear, ColorsText, createQuestion } from '@console';

export const StateTask = {
    Undone: ColorsText.cyanBright(
        ColorsText.bgGrey(
            "Undone..."
        )
    ),
    InProgress: ColorsText.yellowBright(
        ColorsText.bgRed(
            "In Progress~"
        )
    ),
    Done: ColorsText.bgGreenBright(
        ColorsText.black(
            "Done!"
        )
    ),
};
export const descriptions = [
    `Add Task`,
    `Update Task`,
    `Delete Task`,
    `Mark as done`,
    `Mark as in progress`,
    `Mark as undone`,
    `List all tasks`,
    `List all tasks that are done`,
    `List all tasks that are not done`,
    `List all tasks that are in progress`,
];
export const options = () => {
    const messages = [];
    for (let i = 1; i <= descriptions.length; i++) {
        messages.push(
            ` ${ColorsText.greenBright(`${i}.-`)} ${ColorsText.bgWhite(ColorsText.blueBright(` ${descriptions[i-1]} `))}`
        );
    };
    
    for (const message of messages) {
        console.log( message );
    }
};
export const showMenu = ( options: Function ) => {
    console.log(ColorsText.magentaBright(' Select a option, please\n'));
    console.log(ColorsText.redBright(` If you want exit, please, type ${ ColorsText.bgWhiteBright(" exit ")}, ${ ColorsText.bgWhiteBright(" 0 ")} or type twice times ${ ColorsText.bgWhiteBright(" ctrl+c ")} \n`));
    console.log(ColorsText.blueBright(` If you want clear the screen, type ${ ColorsText.bgWhiteBright(" c ")}, ${ ColorsText.bgWhiteBright(" clear ")}\n`));
    options();
    console.log('');
    return createQuestion( ColorsText.bgWhiteBright( ColorsText.black(' Please, select an option ')));
};
export const showTaskList = ( taskList: ITasks[] ) => {
    console.log('\n\n')
    for (let i = 0; i < taskList.length; i++) {
        const { id, description, status, createdAt, updatedAt } = taskList[i];
        console.log( ColorsText.greenBright(' Id: ') ,ColorsText.bgMagentaBright( ColorsText.black(`${id}`)) );
        console.log( ColorsText.greenBright(' Description: ') ,ColorsText.bgMagentaBright( ColorsText.black(`${description}`)) );
        if ( status === 'undone' )     console.log( ColorsText.greenBright(' Status: ') , StateTask.Undone); 
        if ( status === 'inProgress' ) console.log( ColorsText.greenBright(' Status: ') , StateTask.InProgress); 
        if ( status === 'done' )       console.log( ColorsText.greenBright(' Status: ') , StateTask.Done);
        console.log( ColorsText.greenBright(' Created at: ') ,ColorsText.bgCyanBright( ColorsText.black(`${createdAt}`)));
        console.log( ColorsText.greenBright(' Updated at: ') ,ColorsText.bgBlueBright( ColorsText.black(`${updatedAt}`)));
        console.log('')
    }
    console.log('\n\n')
};

export const TaskCLI = async () => {
    console.log(ColorsText.bgBlueBright( ColorsText.yellowBright(" Welcome to my ToDo cli application! ") ));
    let option = '';
    const storage = 'src/storage/todoAppCLI/todolist.json';
    
    let isExistStorage = await existFile( storage );

    let todoList: ITasks[];

    if ( isExistStorage.isValid )    {
        todoList = (await getFilesContentFromJSONFiles<ITasks[]>( storage )).value!;
        console.log("🚀 ~ TaskCLI ~ todoList:", todoList)
    }
    else
    {
        await createFile( storage );
        await FileSysPromises.appendFile( storage, "[]" );
        todoList = [];
    }
    ManageTaskList.taskList = todoList;

    const endApplication = async (close: string): Promise<boolean> => {
        const question = ColorsText.bgRedBright('Are you sure you want to exit? Please, type y or yes\n');
        const exit = /^y(es)?$/i;
    
        const consoleInteraction = rlPromise.createInterface({
            input: input,
            output: output,
            prompt: "Type here:-->"
        });
    
        if (close.trim() === '0' || close.trim().toLowerCase() === 'exit') {
            const answer = await consoleInteraction.question(question);
            consoleInteraction.close();
            if (answer.match(exit)) {
                await ManageTaskList.saveTaskList( addToJSONsFile, storage, ManageTaskList.taskList )
                process.exit(0); 
            } else {
                console.log(ColorsText.yellowBright("Continuing with the application..."));
            }
        } else {
            consoleInteraction.close();
        }
    
        return false;
    };

    do {
        option = await showMenu( options );
        if ( await endApplication( option ) ) break;
        clear( option );
        option = option.trim();
        
        if( option.match(/1/) ){
            const task = await createQuestion(ColorsText.bgYellowBright(ColorsText.blueBright(" Please, create the task: ")));
            console.log('')
            ManageTaskList.addTask( task );
        }
        if( option.match(/2/) ){
            const id = await createQuestion(ColorsText.bgYellowBright(ColorsText.blueBright(" Please, put task's id you want to update: ")));
            const task = await createQuestion(ColorsText.bgYellowBright(ColorsText.blueBright(" Please, give us the new description: ")));
            console.log('')
            ManageTaskList.updateTask( parseInt(id), task );
        }
        if( option.match(/3/) ){
            const id = await createQuestion(ColorsText.bgYellowBright(ColorsText.blueBright(" Please, put task's id you want to update: ")));
            console.log('')
            ManageTaskList.deleteTask( parseInt(id) );
        }
        if( option.match(/4/) ){
            const id = await createQuestion(ColorsText.bgYellowBright(ColorsText.blueBright(" Please, put task's id you want to mark ad done: ")));
            console.log('')
            ManageTaskList.markAs( parseInt( id ), 'done');
            
        }
        if( option.match(/5/) ){
            const id = await createQuestion(ColorsText.bgYellowBright(ColorsText.blueBright(" Please, put task's id you want to mark as in progress: ")));
            console.log('')
            ManageTaskList.markAs( parseInt( id ), 'inProgress');
            
        }
        if( option.match(/6/) ){
            const id = await createQuestion(ColorsText.bgYellowBright(ColorsText.blueBright(" Please, put task's id you want to mark as undone: ")));
            console.log('')
            ManageTaskList.markAs( parseInt( id ), 'undone');
        }
        if( option.match(/7/) ){
            const taskList = ManageTaskList.showTasks('all');
            showTaskList( taskList );
        }
        if( option.match(/8/) ){
            const taskList = ManageTaskList.showTasks('done');
            showTaskList( taskList );
            
        }
        if( option.match(/9/) ){
            const taskList = ManageTaskList.showTasks('undone');
            showTaskList( taskList );
        }
        if( option.match(/10/) ){
            const taskList = ManageTaskList.showTasks('inProgress');
            showTaskList( taskList );
        }
        
    } while ( parseInt( option ) !== 0  );
};

TaskCLI();