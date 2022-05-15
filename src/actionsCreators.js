import { GET_TASKS, CREATE_TASK, DELETE_TASK, EXPIRE_TASK } from "./action";


export const getTasks = () => {
    return {
        type: GET_TASKS
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

export const expireTask = (data, expire) => {
    return {
        type: EXPIRE_TASK,
        payload: data,
        expire
    }
};