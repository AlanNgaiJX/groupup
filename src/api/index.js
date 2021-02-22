import axios from "axios";

// const host = "http://127.0.0.1:1984";
const host = "/myServer";
const instance = axios.create({
    baseURL: host,
    withCredentials: true,
});

export function getPublicKey() {
    return instance.post("/getPublicKey");
}

export function postRegist(args) {
    const { phone, password, vcode } = args;
    return instance.post("/regist", {
        phone,
        password,
        vcode,
    });
}
