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

/* imageViewerOn */
export function updateImageViewerOn(imageViewerOn) {
    return { type: "UPDATE_IMAGE_VEIWER_ON", imageViewerOn };
}

/* imageViewerList */
export function updateImageViewerList(imageViewerList) {
    return { type: "UPDATE_IMAGE_VEIWER_LIST", imageViewerList };
}