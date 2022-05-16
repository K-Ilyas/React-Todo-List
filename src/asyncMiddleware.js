
import { getTasks, requestTasks, createTask, expireTask, deleteTask } from "./actionsCreators";


export const asyncHandler = () => {

    return (dispatch) => {
        dispatch(requestTasks());
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then((response) => response.json())
            .then((json) => dispatch(getTasks(json)));
    }

}

export const asyncHandlerCreate = (item) => (dispatch) => {

    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
            title: item.title,
            completed: item.completed
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            return dispatch(createTask(json))
        });


}


export const asyncHandlerExpire = (item) => (dispatch) => {

    fetch('https://jsonplaceholder.typicode.com/todos/1', {
        method: 'PUT',
        body: JSON.stringify({
            userId: item.userId,
            id: item.id,
            title: item.title,
            completed: item.completed
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            return dispatch(expireTask(json))
        });
}


export const asyncHandlerDelete = (item) => (dispatch) => {

    fetch('https://jsonplaceholder.typicode.com/todos/1', {
        method: 'DELETE',
        body: JSON.stringify({
            userId: item.userId,
            id: item.id,
            title: item.title,
            completed: item.completed
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            return dispatch(deleteTask(item))
        });
}

