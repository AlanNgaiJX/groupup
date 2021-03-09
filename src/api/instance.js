import axios from "axios";
import { getCookie } from "@/units/utilsUnit.js";
import modal from "@/units/modalUnit.js";
import Config from "@/config/index.js";

const host = Config.host;
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

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 处理 99 未登录
        if (response.status === 200 && response.data.code !== 200) {
            modal.showToast({
                title: response.data.msg,
            });
        }
        if (response.status === 200 && response.data.code === 99) {
            setTimeout(() => {
                window.location.href =
                    window.location.href.split("#")[0] + "#/login";
            }, 1500);
        }
        return response;
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default instance;
