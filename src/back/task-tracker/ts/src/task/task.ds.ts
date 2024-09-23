import { Formatter } from '../util/date.formatter';

export type TStatus = 'undone' | 'inProgress' | 'done' ;

export interface ITasks{
    id: number;
    description: string;
    status: TStatus;
    createdAt: string;
    updatedAt: string;
}

export interface ITasksMsg{
    msg: string;
    task: ITasks;
}

export const ManageTaskList = {
    taskList: [] as ITasks[],

    createTaskList: function ( taskList: ITasks[] = []): string {
        this.taskList = taskList;
        return "Task list was created succesfully";
    },
    
    saveTaskList: function(){
    },

    addTask: function( description: string ): ITasks {
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
        return task;
    },
    
    updateTask: function( idTask: number, newDescription: string ): string | ITasksMsg {
        const taskToUpdate = this.taskList.find( ({id}) => id === idTask );
        if ( !taskToUpdate ){
            return `Task with id: ${idTask} not exist, it was not possible add: ${ newDescription }`;
        }
        taskToUpdate.description = newDescription;
        taskToUpdate.updatedAt = Formatter.formatDate( new Date() );
        return {
            msg: `Task with id: ${ idTask } was updated successfully!`,
            task: taskToUpdate
        };
    },
    markAs: function( idTask: number, state: TStatus ): string | ITasksMsg {
        const taskToUpdate = this.taskList.find( ({id}) => id === idTask );
        if ( !taskToUpdate ) return `Task with id: ${idTask} not exist, it was not possible update the state`;
        taskToUpdate.status = state;
        taskToUpdate.updatedAt = Formatter.formatDate( new Date)
        return {
            msg: `The task with id: ${ idTask } was marked as ${ state }`,
            task: taskToUpdate,
        };
    },
    deleteTask: function( idTask: number ): string {
        const taskToDelete = this.taskList.find( ({id}) => id === idTask );
        if( !taskToDelete ) {
            return `Task with id: ${idTask} not exist, was not possible delete`;
        };

        if ( idTask < this.taskList.length ) 
            for (let i = idTask; i < this.taskList.length; i++) this.taskList[i].id -=1;

        this.taskList.splice( this.taskList.indexOf( taskToDelete ), 1 )
        return "Task was deleted successfully!";
    },
    showTasks: function( show: 'all' | TStatus ): ITasks[] {
        if ( show === 'all' ) return [ ...this.taskList ];
        else return [...this.taskList.filter(({ status }) => status === show)];
    }
}