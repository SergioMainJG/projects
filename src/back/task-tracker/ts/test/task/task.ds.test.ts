import { styleText } from 'node:util';
import * as testing from 'bun:test';

import { ManageTaskList, type ITasks, type TStatus } from '@task.ds';
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
    });

    testing.test("Expect addTask add a new tasks in a task list", () =>{
        ManageTaskList.createTaskList();
        ManageTaskList.addTask( 'abc' );
        ManageTaskList.addTask( 'def' );
        ManageTaskList.addTask( 'ghi' );
        ManageTaskList.addTask( 'jkl' );
        ManageTaskList.addTask( 'mno' );
        ManageTaskList.addTask( 'pqr' );
        ManageTaskList.addTask( 'stu' );
        ManageTaskList.addTask( 'vwx' );
        ManageTaskList.addTask( 'yz1' );
        ManageTaskList.addTask( '234' );
        testing.expect( ManageTaskList.taskList.length ).toBe( 10 );
    });

    testing.test("Expect updateTask update a task with a new description", async () =>{
        
        ManageTaskList.createTaskList();
        
        const oldDescription = 'Aliquip commodo tempor laboris deserunt exercitation occaecat nostrud qui laborum.'
        const newDescription = 'ASDFGHJKLÑQWERTYUIOPZXCVBNM 1234567890';
        
        ManageTaskList.createTaskList();
        ManageTaskList.addTask( 'abc' );
        ManageTaskList.addTask( 'def' );
        ManageTaskList.addTask( oldDescription );
        ManageTaskList.addTask( 'ghi' );

        ManageTaskList.showTasks('all');
        
        const taskToTest = ManageTaskList.taskList.find(({id}) => id === 3); 
        const oldUpdateDate = taskToTest?.updatedAt;
        console.log("oldUpdateDate:", oldUpdateDate)
        
        testing.expect( taskToTest?.updatedAt ).toBe( oldUpdateDate! );
        
        console.log(styleText('redBright', 'Música de elevador!'));
        await sleep(2000);
        console.log(styleText('redBright', 'Música de elevador!'));

        ManageTaskList.updateTask(3, newDescription);
        const newUpdateDate = taskToTest?.updatedAt;
        console.log("newUpdateDate:", newUpdateDate)
        
        testing.expect( taskToTest?.id ).toBe(3);
        testing.expect( taskToTest?.description ).toBe( newDescription );
        testing.expect( taskToTest?.updatedAt ).toBe( newUpdateDate! );
        ManageTaskList.showTasks('all');
    });

    testing.test("Expect updateTask not update a task if this task not exist", () =>{
        
        const newTask1 = 'adasd';
        const newTask2 = 'arkpv';
        const newTask3 = 'mpjfdf';
        const newTask4 = 'jasdpa';
        
        ManageTaskList.addTask(newTask1);
        ManageTaskList.addTask(newTask2);
        ManageTaskList.addTask(newTask3);
        ManageTaskList.addTask(newTask4);
        
        ManageTaskList.updateTask(10, 'ME ACTUALICÉ ASÍ ES');
        
        testing.expect( ManageTaskList.taskList.length ).toBe(4);
        testing.expect( ManageTaskList.taskList[0].description ).toBe(newTask1);
        testing.expect( ManageTaskList.taskList[1].description ).toBe(newTask2);
        testing.expect( ManageTaskList.taskList[2].description ).toBe(newTask3);
        testing.expect( ManageTaskList.taskList[3].description ).toBe(newTask4);
    });
    
    testing.test("Expect markAs update the task's status to done ", () =>{
        ManageTaskList.addTask('Done?');
        const task = ManageTaskList.taskList[0];
        testing.expect( task.status ).toBe('undone');
        
        ManageTaskList.showTasks('undone');
        
        ManageTaskList.markAs(1, 'done');
        testing.expect( task.status ).toBe('done');
        ManageTaskList.showTasks('done');
    });

    testing.test("Expect markAs update the task's status to in progress ", () =>{
        ManageTaskList.addTask('In progress?');
        const task = ManageTaskList.taskList[0];
        testing.expect( task.status ).toBe('undone');
        
        ManageTaskList.showTasks('undone');
        
        ManageTaskList.markAs(1, 'inProgress');
        testing.expect( task.status ).toBe('inProgress');
        ManageTaskList.showTasks('inProgress');
    });
    
    testing.test("Expect markAs update the task's status to undone ", () =>{
        ManageTaskList.addTask('In progress?');
        const task = ManageTaskList.taskList[0];
        testing.expect( task.status ).toBe('undone');
        
        ManageTaskList.showTasks('undone');
        
        ManageTaskList.markAs(1, 'inProgress');
        testing.expect( task.status ).toBe('inProgress');
        ManageTaskList.showTasks('inProgress');

        ManageTaskList.markAs(1, 'undone');
        testing.expect( task.status ).toBe('undone');
        ManageTaskList.showTasks('undone');
    });
    
    testing.test("Expect deleteTask delete a task", () =>{
        ManageTaskList.addTask('If you see me 2 times, so you are so bad in software development');
        const task = ManageTaskList.taskList[0];
        testing.expect( task.status ).toBe('undone');

        ManageTaskList.deleteTask(1);

        ManageTaskList.showTasks('all');

        testing.expect( ManageTaskList.taskList.length ).toBe(0);
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

    // testing.test("", () =>{});
});