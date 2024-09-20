import { styleText } from 'node:util';
import { Formatter } from '../util/date.formatter';

const Undone = styleText("bgGrey", "undone...");
const InProgress = styleText("yellowBright", "in progress~");
const Done = styleText("greenBright", "done!");

export type TStatus = 'undone' | 'inProgress' | 'done' ;

export interface ITasks{
    id: number,
    description: string,
    status: TStatus,
    createdAt: string,
    updatedAt: string,
}

export const ManageTaskList = {
    taskList: [] as ITasks[],

    createTaskList: function ( taskList: ITasks[] = []): void {
        this.taskList = taskList;
        console.log(styleText('blueBright', "Task list was created succesfully"));
        return;
    },
    
    saveTaskList: function(){
        //!TODO: REALIZAR LA INTERACCIÓN CON EL ARCHIVO .json
    },

    addTask: function( description: string ): void {
        const task: ITasks = {
            id: this.taskList.at(-1)?.id
                ? this.taskList.at(-1)?.id! + 1 
                : 1,
            description: description,
            status: 'undone',
            createdAt: Formatter.formatDate( new Date() ),
            updatedAt: Formatter.formatDate( new Date() ),
        };

        this.taskList.push( task );
        console.log(
            styleText('greenBright', "Task added succesfully!"),
            styleText("cyanBright",
            `
Id: ${task.id}
Description: ${task.description}
Status: ${task.status}
Created At: ${task.createdAt}
Updated At: ${task.updatedAt}
`
        ));
    },
    
    updateTask: function( idTask: number, newDescription: string ): void {
        const taskToUpdate = this.taskList.find( ({id}) => id === idTask );
        if ( !taskToUpdate ){
            console.log(styleText("redBright", `Task with id: ${idTask} not exist, it was not possible add: ${ newDescription }`));
            return;
        }
        taskToUpdate.description = newDescription;
        taskToUpdate.updatedAt = Formatter.formatDate( new Date() );
        console.log(styleText("greenBright", `Task with id: ${ idTask } was updated successfully!`));
    },
    markAs: function( idTask: number, state: TStatus ): void {
        const taskToUpdate = this.taskList.find( ({id}) => id === idTask );
        if ( !taskToUpdate ) return console.log(styleText("redBright", `Task with id: ${idTask} not exist, it was not possible update the state`));
        taskToUpdate.status = state;
        taskToUpdate.updatedAt = Formatter.formatDate( new Date)
        const { id, description, status, createdAt, updatedAt } = taskToUpdate;
        console.log(styleText("yellow",
            `Id: ${id}
Description: ${description}`))
        if( status ==='undone' ) console.log(`Status: ${Undone}`);
        if( status ==='inProgress' ) console.log(`Status: ${InProgress}`);
        if( status ==='done' ) console.log(`Status: ${Done}`);
        console.log(styleText("yellow",
            `Created At: ${createdAt}
Created At: ${updatedAt}
`));
    },
    deleteTask: function( idTask: number ): void {
        const taskToDelete = this.taskList.find( ({id}) => id === idTask );
        if( !taskToDelete ) {
            console.log(styleText("redBright", `Task with id: ${idTask} not exist, was not possible delete`))
            return;
        };
        // this.taskList = this.taskList.filter(({id}) => idTask !== id );
        this.taskList.splice( this.taskList.indexOf( taskToDelete ), 1 )
        console.log(styleText("bgGrey", "Task was deleted successfully!"));
    },
    showTasks: function( show: 'all' | TStatus ){
        let taskList: ITasks[];
        if ( show === 'all' ) taskList = [ ...this.taskList ];
        else taskList = this.taskList.filter(({ status }) => status === show);

        for (let i = 0; i < taskList.length; i++) {
            const { id, description, status, createdAt, updatedAt } = taskList[i]; 
            console.log(styleText("yellow",
                `Id: ${id}
Description: ${description}`))
            if( status ==='undone' ) console.log(`Status: ${Undone}`);
            if( status ==='inProgress' ) console.log(`Status: ${InProgress}`);
            if( status ==='done' ) console.log(`Status: ${Done}`);
            console.log(styleText("yellow",
                `Created At: ${createdAt}
Created At: ${updatedAt}
`));
        };
        
    }
//     showAllTaskList: function(){
//         for (let i = 0; i < this.taskList.length; i++) {
//             const { id, description, status, createdAt, updatedAt } = this.taskList[i]; 
//             console.log(styleText("yellow",
//                 `Id: ${id}
// Description: ${description}`))
//             if( status ==='undone' ) console.log(Undone);
//             if( status ==='inProgress' ) console.log(InProgress);
//             if( status ==='done' ) console.log(Done);
//             console.log(styleText("yellow",
//                 `Created At: ${createdAt}
// Cpdated At: ${updatedAt}
// `));
//         };
//     },    
//     ,showAllTaskDone: function(){
//         const taskListDone = this.taskList.filter(({status}) => status === 'done');

//         for (let i = 0; i < taskListDone.length; i++) {
//             const { id, description, status, createdAt, updatedAt } = taskListDone[i]; 
//             console.log(styleText("yellow",
//                 `Id: ${id}
// Description: ${description}`))
//             if( status ==='undone' ) console.log(Undone);
//             if( status ==='inProgress' ) console.log(InProgress);
//             if( status ==='done' ) console.log(Done);
//             console.log(styleText("yellow",
//                 `Created At: ${createdAt}
// Cpdated At: ${updatedAt}
// `));
//         };
//     },
    
//     showAllTaskInProgress: function(){
//         const taskListInProgress = this.taskList.filter(({status}) => status === 'inProgress');

//         for (let i = 0; i < taskListInProgress.length; i++) {
//             const { id, description, status, createdAt, updatedAt } = taskListInProgress[i]; 
//             console.log(styleText("yellow",
//                 `Id: ${id}
// Description: ${description}`))
//             if( status ==='undone' ) console.log(Undone);
//             if( status ==='inProgress' ) console.log(InProgress);
//             if( status ==='done' ) console.log(Done);
//             console.log(styleText("yellow",
//                 `Created At: ${createdAt}
// Cpdated At: ${updatedAt}
// `));
//         };
//     },
    
//     showAllTaskUndone: function(){
//         const taskListUndone = this.taskList.filter(({status}) => status === 'undone');

//         for (let i = 0; i < taskListUndone.length; i++) {
//             const { id, description, status, createdAt, updatedAt } = taskListUndone[i]; 
//             console.log(styleText("yellow",
//                 `Id: ${id}
// Description: ${description}`))
//             if( status ==='undone' ) console.log(Undone);
//             if( status ==='inProgress' ) console.log(InProgress);
//             if( status ==='done' ) console.log(Done);
//             console.log(styleText("yellow",
//                 `Created At: ${createdAt}
// Cpdated At: ${updatedAt}
// `));
//         };
//     },
}

