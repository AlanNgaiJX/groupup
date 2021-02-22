export function count(state = 0, action) {
    switch (action.type) {
        case "ADD_COUNT":
            return state + action.value;
        default:
            return state;
    }
}

const initRegistForm = {
    phone: "18122803695",
    vcode: "",
    password: "",
};
export function registForm(state = Object.assign({}, initRegistForm), action) {
    switch (action.type) {
        case "UPDATE_REGIST_FORM":
            return Object.assign({}, state, action.data);
        case "RESET_REGIST_FORM":
            return Object.assign({}, initRegistForm);
        default:
            return state;
    }
}

export function publicKey(state = "", action) {
    switch (action.type) {
        case "UPDATE_PUBLICKEY":
            return action.publicKey;
        default:
            return state;
    }
}
