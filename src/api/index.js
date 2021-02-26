import axios from "axios";
import { getCookie } from "@/units/utilsUnit.js";
// const host = "http://127.0.0.1:1984";
const host = "/myServer";
const instance = axios.create({
    baseURL: host,
    withCredentials: true,
});

// 将 token 放到拦截器里面处理
instance.interceptors.request.use(function (config) {
    const requestToken = getCookie("token"); // 获取我们存储的 token
    config.headers["Authorization"] = "Bearer " + requestToken; // 将 token 放到 header 里面
    config.headers.post["Content-Type"] = "application/json";
    // config.timeout = 60000;
    return config;
});

export function getPublicKey() {
    return instance.post("/common/getPublicKey");
}

export function postRegist(args) {
    const { phone, password, vcode } = args;
    return instance.post("/regist", {
        phone,
        password,
        vcode,
    });
}

export function loginByPwd(args) {
    const { phone, password } = args;
    return instance.post("/login/loginByPwd", {
        phone,
        password,
    });
}

export function uploadImg(args) {
    const data = new FormData();
    const { file, fileName } = args;
    data.append("fileName", fileName);
    data.append("file", file);

    return instance.post("/common/uploadImg", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}

export function getToken() {
    return instance.post("/test/getToken");
}

export function testJwtAuth() {
    return instance.post("/test/jwtAuth");
}
