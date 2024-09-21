import { styleText } from 'node:util';
import * as testing from 'bun:test';

import { ManageTaskList, type ITasks } from '@task.ds';
import { Formatter } from '@util/date.formatter';

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(
        resolve, ms));
}
  


testing.describe('Testing for: /src/task/task.ds.ts', () => {

    testing.beforeEach(() => ManageTaskList.taskList = [] );

    //!TODO: createTaskList con los items de .json
    //!TODO: createTaskList con los items de .json
    testing.test('Expect createTaskList create a new task list, this task list must be void', () => {
        ManageTaskList.createTaskList();
        testing.expect( ManageTaskList.taskList.length ).toBe( 0 );
    });

    testing.test('Expect createTaskList create a new task list whit a pre-existent task list', () => {
        const tasks: ITasks = {
            id: 1,
            description: "Laborum proident fugiat eiusmod magna aliquip.",
            createdAt: Formatter.formatDate(new Date()),
            status: 'undone',
            updatedAt: Formatter.formatDate(new Date())
        }

        const list: ITasks[] = [];
        list.length = 30;
        list.fill(tasks);
        ManageTaskList.createTaskList( list );
        testing.expect( ManageTaskList.taskList.length ).toBe( 30 );
        testing.expect( typeof ManageTaskList.createTaskList() ).toBe('string');
    });

    testing.test("Expect addTask add a new tasks in a task list", () =>{
        ManageTaskList.createTaskList();
        const tasks = ['abc','def','ghi','jkl','mno','pqr','stu','vwx','yz1','234'];

        tasks.forEach( ( taskDesc, i ) => {
            const task = ManageTaskList.addTask(taskDesc);
            testing.expect( task.id ).toBe( i +1 );
            testing.expect( typeof task.id ).toBe('number');
            testing.expect( task.description ).toBe( taskDesc );
            testing.expect( typeof task.description ).toBe('string');
            testing.expect( task.status ).toBe('undone');
            testing.expect( typeof task.status ).toBe('string');
            testing.expect( task.createdAt ).toBe( Formatter.formatDate( new Date() ));
            testing.expect( typeof task.createdAt ).toBe('string');
            testing.expect( task.updatedAt ).toBe( Formatter.formatDate( new Date() ));
            testing.expect( typeof task.updatedAt ).toBe('string');
        });
        testing.expect( ManageTaskList.taskList.length ).toBe( tasks.length );
    });

    testing.test("Expect updateTask update a task with a new description", async () =>{
        const oldDescription = 'Aliquip commodo tempor laboris deserunt exercitation occaecat nostrud qui laborum.'
        const newDescription = 'ASDFGHJKLÑQWERTYUIOPZXCVBNM 1234567890';
        
        ManageTaskList.createTaskList();

        const tasks = [ 'abc', 'def', oldDescription, 'ghi' ];

        tasks.forEach( (task) => { ManageTaskList.addTask(task) } );

        const taskToTest: ITasks = ManageTaskList.taskList.find(({id}) => id === 3)!; 
        const oldUpdateDate = taskToTest?.updatedAt;
        testing.expect( taskToTest?.updatedAt ).toBe( oldUpdateDate! );
        
        await sleep(2000);
        const taskRes = ManageTaskList.updateTask( ManageTaskList.taskList.indexOf( taskToTest! )+1, newDescription );
        
        if( typeof taskRes === 'string'){
        }
        else {
            const { msg, task } = taskRes;
            const newUpdateDate = taskToTest?.updatedAt;
            testing.expect( task?.id ).toBe(3);
            testing.expect( task?.description ).toBe( newDescription );
            testing.expect( task?.updatedAt ).toBe( newUpdateDate! );
            testing.expect( typeof msg ).toBe('string');
            ManageTaskList.showTasks('all');
        }    
    });

    testing.test("Expect updateTask not update a task if this task not exist", () =>{
        
        const tasks = ['adasd','arkpv','mpjfdf','jasdpa'];
        
        tasks.forEach( ( task ) => {ManageTaskList.addTask( task )});
        
        testing.expect( typeof ManageTaskList.updateTask( tasks.length + 10 , 'ME ACTUALICÉ ASÍ ES') ).toBe('string');
        testing.expect( ManageTaskList.taskList.length ).toBe( tasks.length );
    });
    
    testing.test("Expect markAs update the task's status to: undone, in progress, done", () => {
        const tasks = [ "asdcxc c d", "asdfasda¿sd", "234r5tyh", "Done?", "asdasd","In Progress?", "1293mdas", "absdadops","Undone?"];
        tasks.forEach(( tasks ) => {ManageTaskList.addTask( tasks )} );
        
        const tasksMarked = [
            ManageTaskList.markAs( 4, 'done' ),
            ManageTaskList.markAs( 6, 'inProgress' ),
            ManageTaskList.markAs( 9, 'done' ),
        ];
        ManageTaskList.markAs( 9, 'undone');

        if ( typeof tasksMarked[0] === 'string' ) {  }
        else{
            const { msg, task } = tasksMarked[0];
            testing.expect( typeof task ).toBe('object');
            testing.expect( typeof msg ).toBe('string');
            testing.expect( task.id ).toBe(4);
            testing.expect( typeof task.id ).toBe('number');
            testing.expect( task.description ).toBe( tasks.at(3)! );
            testing.expect( typeof task.description ).toBe('string');
            testing.expect( task.status ).toBe( 'done' );
            testing.expect( typeof task.status ).toBe('string');
            testing.expect( task.createdAt ).toBe(Formatter.formatDate( new Date() ));
            testing.expect( typeof task.createdAt ).toBe('string');
            testing.expect( task.updatedAt ).toBe(Formatter.formatDate( new Date() ));
            testing.expect( typeof task.updatedAt ).toBe('string');
        }

        if ( typeof tasksMarked[1] === 'string' ) {  }
        else{
            const { msg, task } = tasksMarked[1];
            testing.expect( typeof task ).toBe('object');
            testing.expect( typeof msg ).toBe('string');
            testing.expect( task.id ).toBe(6);
            testing.expect( typeof task.id ).toBe('number');
            testing.expect( task.description ).toBe( tasks.at(5)! );
            testing.expect( typeof task.description ).toBe('string');
            testing.expect( task.status ).toBe( 'inProgress' );
            testing.expect( typeof task.status ).toBe('string');
            testing.expect( task.createdAt ).toBe(Formatter.formatDate( new Date() ));
            testing.expect( typeof task.createdAt ).toBe('string');
            testing.expect( task.updatedAt ).toBe(Formatter.formatDate( new Date() ));
            testing.expect( typeof task.updatedAt ).toBe('string');
        }

        if ( typeof tasksMarked[2] === 'string' ) {  }
        else{
            const { msg, task } = tasksMarked[2];
            testing.expect( typeof task ).toBe('object');
            testing.expect( typeof msg ).toBe('string');
            testing.expect( task.id ).toBe(9);
            testing.expect( typeof task.id ).toBe('number');
            testing.expect( task.description ).toBe( tasks.at(8)! );
            testing.expect( typeof task.description ).toBe('string');
            testing.expect( task.status ).toBe('undone');
            testing.expect( typeof task.status ).toBe('string');
            testing.expect( task.createdAt ).toBe(Formatter.formatDate( new Date() ));
            testing.expect( typeof task.createdAt ).toBe('string');
            testing.expect( task.updatedAt ).toBe(Formatter.formatDate( new Date() ));
            testing.expect( typeof task.updatedAt ).toBe('string');
        }
    });
    
    testing.test("Expect deleteTask delete a task", () =>{
        ManageTaskList.addTask('123123');
        ManageTaskList.addTask('If you see me 2 times, so you are so bad in software development');
        ManageTaskList.addTask('jdasjdas');
        testing.expect( typeof ManageTaskList.deleteTask(2) ).toBe('string');
        testing.expect( ManageTaskList.taskList.length ).toBe(2);
        testing.expect( ManageTaskList.taskList[1].id ).toBe(2);
    });
    
    testing.test("Expect deleteTask not delete if task not exist", () =>{
        const newTask1 = 'adasd';
        const newTask2 = 'arkpv';
        const newTask3 = 'mpjfdf';
        const newTask4 = 'jasdpa';
        
        ManageTaskList.addTask(newTask1);
        ManageTaskList.addTask(newTask2);
        ManageTaskList.addTask(newTask3);
        ManageTaskList.addTask(newTask4);
        
        ManageTaskList.deleteTask(10);
        
        testing.expect( ManageTaskList.taskList.length ).toBe(4);
        testing.expect( ManageTaskList.taskList[0].description ).toBe(newTask1);
        testing.expect( ManageTaskList.taskList[1].description ).toBe(newTask2);
        testing.expect( ManageTaskList.taskList[2].description ).toBe(newTask3);
        testing.expect( ManageTaskList.taskList[3].description ).toBe(newTask4);
    });

});