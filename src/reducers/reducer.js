import { GET_TASKS, CREATE_TASK, DELETE_TASK, EXPIRE_TASK } from "../action";

const defaultState = {
    items: [{ item: "learn how to code", expire: true }]
}

const reducer = (state = defaultState, action) => {

    switch (action.type) {
        case GET_TASKS:
            return state;
        case CREATE_TASK:
            return { items: [action.payload, ...state.items] };
        case DELETE_TASK:
            return { items: [...state.items.filter((e) => e.item !== action.payload.item)] };
        case EXPIRE_TASK:
            return {
                items: [...state.items.map((e) => {
                    if (e.item === action.payload.item)
                        e.expire = action.expire;
                    return e;
                })]
            };
        default:
            return state;
    }

}



export default reducer;