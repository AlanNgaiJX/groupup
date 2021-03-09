import { getCookie } from "@/units/utilsUnit.js";

export function count(state = 0, action) {
    switch (action.type) {
        case "ADD_COUNT":
            return state + action.value;
        default:
            return state;
    }
}

const initRegistForm = {
    phone: "",
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

const initUserId = getCookie("userId");
export function userId(state = initUserId, action) {
    switch (action.type) {
        case "UPDATE_USERID":
            return action.userId;
        default:
            return state;
    }
}

export function imageViewerOn(state = false, action) {
    switch (action.type) {
        case "UPDATE_IMAGE_VEIWER_ON":
            return action.imageViewerOn;
        default:
            return state;
    }
}

export function imageViewerList(state = [], action) {
    switch (action.type) {
        case "UPDATE_IMAGE_VEIWER_LIST":
            return action.imageViewerList;
        default:
            return state;
    }
}

export function refreshHome(state = false, action) {
    switch (action.type) {
        case "UPDATE_REFRESHHOME":
            return action.refreshHome;
        default:
            return state;
    }
}

export function refreshGroup(state = false, action) {
    switch (action.type) {
        case "UPDATE_REFRESHGROUP":
            return action.refreshGroup;
        default:
            return state;
    }
}

export function refreshMe(state = false, action) {
    switch (action.type) {
        case "UPDATE_REFRESHME":
            return action.refreshMe;
        default:
            return state;
    }
}