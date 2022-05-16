import { GET_TASKS, REQUEST_TASKS, CREATE_TASK, DELETE_TASK, EXPIRE_TASK } from "../action";

const defaultState = {
    loading: false,
    items: []
}

const reducer = (state = defaultState, action) => {



    const maxId = (item) => {
        item.id = state.items[state.items.length - 1].id + 1;
        return item;
    }

    switch (action.type) {
        case REQUEST_TASKS:
            return {
                loading: true,
                items: []
            };
        case GET_TASKS:
            return {
                loading: false,
                items: action.payload
            };
        case CREATE_TASK:
            return { loading: false, items: [...state.items, maxId(action.payload)] };
        case DELETE_TASK:
            return { loading: false, items: [...state.items.filter((e) => e.id !== action.payload.id)] };
        case EXPIRE_TASK:
            return {
                loading: false,
                items: [...state.items.map((e) => {
                    if (e.title === action.payload.title)
                        e.completed = action.payload.completed;
                    return e;
                })]
            };
        default:
            return state;
    }

}



export default reducer;