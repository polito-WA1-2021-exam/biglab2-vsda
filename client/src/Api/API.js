import dayjs from 'react-dayjs'

const baseURL = "/api";


async function getTasks(filter) {
    let url = "/tasks/all";
    if (filter) {
        const queryParams = "/" + filter;
        url += queryParams;
    }
    const response = await fetch(baseURL + url);
    const tasksJson = await response.json();
    const array = [];

    if (response.ok) {
        console.log("response è ok"); 
        let toRet = tasksJson.forEach(t => {
            const important = (t.important === undefined)? false : t.important === 1 || t.important === true;
            const isprivate = (t.private === undefined)? true : t.private === 1 || t.private === true;
            const completed = (t.completed === undefined)? false : t.completed === 1 || t.completed === true;
            const deadline = (t.deadline === undefined)? dayjs(deadline) : '';
            let task = { id: t.id, description: t.description,  important: important, isprivate: isprivate, completed: completed, deadline: deadline};
            array.push(task);
        }
        );
        console.log("task ricevute: ");
        console.log(array);
        return toRet;
    } else {
        let err = { status: response.status, errObj: tasksJson };
        console.log(err);
        throw err;  // An object with the error coming from the server
    }
}


export default getTasks;

/*export async function getPublicTasks() {
    let url = "/tasks/public";

    const response = await fetch(baseURL + url);
    const tasksJson = await response.json();
    if(response.ok){
        //return tasksJson.map((t) => Task.from(t));
        return tasksJson.map((t) => new Task(t.id,t.description,t.important, t.privateTask,t.deadline,t.project, t.completed, t.user));
    } else {
        let err = {status: response.status, errObj:tasksJson};
        throw err;  // An object with the error coming from the server
    }
}

export async function addTask(task) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/tasks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

export async function updateTask(task) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/tasks/" + task.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        }).then( (response) => {
            if(response.ok) {

            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}


export async function deleteTask(taskId) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/tasks/" + taskId, {
            method: 'DELETE'
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password}),
        }).then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    resolve(user);
                });
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function userLogout(username, password) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/logout', {
            method: 'POST',
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        });
    });
}

const API = { isAuthenticated, getTasks, getPublicTasks, addTask, updateTask,deleteTask, userLogin, userLogout} ;

*/
