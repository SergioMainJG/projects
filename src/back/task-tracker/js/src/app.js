import { pausa, showMenu, giveValueToFunctions } from './interface/console.app.js';
import {
    createTaskList,
    ManageTaskList,
    Shows,
} from './tasks/task.js';


( async (  ) => {
    console.log("¡Welcome!");
    let opt = '';
    const taskList = createTaskList();
    // console.log(taskList)
    // ManageTaskList
    // Shows
    do
    {
        console.log("Type '0' or type ctrl+c if you want exit");
        opt = await showMenu();
        if( opt === '0' ) process.exit(0);
        if( opt === '1'){
            ManageTaskList.add(
                await giveValueToFunctions('Write the new task'),
                taskList
            );
        };
        if( opt === '2'){
            ManageTaskList.update(
                await giveValueToFunctions("Write the task's id to update"),
                await giveValueToFunctions('Write the new Task'),
                taskList
            );
        };
        if( opt === '3'){
            ManageTaskList.delete(
                await giveValueToFunctions("Write the task's id to delete"),
                taskList
            );
        };
        if( opt === '4'){
            ManageTaskList.markAsDone(
                await giveValueToFunctions("Write the task's id to mark as done"),
                taskList
            );
        };
        if( opt === '5'){
            ManageTaskList.markAsInProgress(
                await giveValueToFunctions("Write the task's id to mark as done"),
                taskList
            );
        };
        if( opt === '6') Shows.showAll( taskList );
        if( opt === '7') Shows.showDone( taskList );
        if( opt === '8') Shows.showNotDone( taskList );
        if( opt === '9') Shows.showInProgress( taskList );
        await pausa();
        console.clear();
    }
    while(opt !== '0');
})();