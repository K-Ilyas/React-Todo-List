import { REQUEST_TASKS, GET_TASKS, CREATE_TASK, DELETE_TASK, EXPIRE_TASK } from "./action";


export const requestTasks = () => {
    return {
        type: REQUEST_TASKS
    }
};

export const getTasks = (data) => {
    return {
        type: GET_TASKS,
        payload: data
    }
};

export const createTask = (data) => {
    return {
        type: CREATE_TASK,
        payload: data
    }
};

export const deleteTask = (data) => {
    return {
        type: DELETE_TASK,
        payload: data
    }
};

export const expireTask = (data) => {
    return {
        type: EXPIRE_TASK,
        payload: data
    }
};