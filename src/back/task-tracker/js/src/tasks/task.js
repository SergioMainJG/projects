import { styleText } from 'node:util';
const TaskStatus = [
    'undone',
    'in progres',
    'done',
];
/**
 * @param { string } description
 */
const createTask = ( description = '') => {
    return {
        description: description,
        status: TaskStatus[0],
    };
};
/**
 * 
 * @returns { Array<string> } taskList 
 */
export const createTaskList = () => [];


export const ManageTaskList = {
                      /**
                      * @param   { string }  task
                      * @param   { Array<object> }  taskList
                      */
    add:              ( task, taskList ) => taskList.push( createTask(task) ),
                      /**
                      * @param   { string }  id
                      * @param   { string }  newTask
                      * @param   { Array<string> }  taskList
                      */
    update:           ( id, newTask, taskList ) => taskList[id-1].description = newTask,
                      /**
                      * @param   { string }  id
                      * @param   { Array<string> }  taskList
                      */    
    delete:           ( id, taskList ) => taskList.splice( id-1, 1),
    markAsDone:       ( id, taskList ) => taskList[id-1].status = TaskStatus[2],
    markAsInProgress: ( id, taskList ) => taskList[id-1].status = TaskStatus[1],
};

export const Shows = {
                    /**
                     * 
                     * @param { Array<object>} taskList 
                     */
    showAll:        ( taskList ) => {
                        for (let i = 0; i < taskList.length ; i++) {
                            console.log(`${styleText('greenBright', `id: ${i+1}`)}: ${taskList[i].description}; estado: ${taskList[i].status}`);
                        };
    },
                    /**
                     * 
                     * @param { Array<object>} taskList 
                     */
    showDone:       ( taskList ) => {
                        for (let i = 0; i < taskList.length; i++) {
                            if ( taskList[i].status === TaskStatus[2] ) console.log(`${styleText('greenBright', `id: ${i+1}`)}: ${taskList[i].description}; estado: ${taskList[i].status}`);
                        };
    },
                    /**
                     * 
                     * @param { Array<object>} taskList 
                     */
    showNotDone:    ( taskList ) => {
                        for (let i = 0; i < taskList.length; i++) {
                            if ( taskList[i].status === TaskStatus[0] ) console.log(`${styleText('greenBright', `id: ${i+1}`)}: ${taskList[i].description}; estado: ${taskList[i].status}`);
                        };
    },
    showInProgress: ( taskList ) => {
                        for (let i = 0; i < taskList.length; i++) {
                            if ( taskList[i].status === TaskStatus[1] ) console.log(`${styleText('greenBright', `id: ${i+1}`)}: ${taskList[i].description}; estado: ${taskList[i].status}`);;
                        };
                    },
};