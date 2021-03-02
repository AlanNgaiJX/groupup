/* count */
export function addCount(value) {
    return { type: "ADD_COUNT", value };
}

/* registForm */
export function updateRegistForm(data) {
    return { type: "UPDATE_REGIST_FORM", data };
}

export function resetRegistForm() {
    return { type: "RESET_REGIST_FORM" };
}

/* publicKey */
export function updatePublicKey(publicKey) {
    return { type: "UPDATE_PUBLICKEY", publicKey };
}

/* userId */
export function updateUserId(userId) {
    return { type: "UPDATE_USERID", userId };
}
