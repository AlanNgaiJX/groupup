import axios from "axios";
import { getCookie } from "@/units/utilsUnit.js";
import modal from "@/units/modalUnit.js";
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
                window.location.href = "/login";
            }, 1500);
        }
        return response;
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

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

export function getInfoByUserId(args) {
    return instance.post("/common/getInfoByUserId", {
        userId: args.userId,
    });
}

export function updateUserInfo(args) {
    const { userId, avatar, background, city, gender, intro, nickName } = args;
    return instance.post("/common/updateUserInfo", {
        userId,
        avatar,
        background,
        city,
        gender,
        intro,
        nickName,
    });
}

export function createGroup(args) {
    const {
        userId,
        groupName,
        groupIntro,
        groupType,
        groupPassword,
        groupLocation,
        groupCover,
    } = args;
    return instance.post("/group/createGroup", {
        userId,
        groupName,
        groupIntro,
        groupType,
        groupPassword,
        groupLocation,
        groupCover,
    });
}

export function findGroupsByOwner(args) {
    return instance.post("/group/findGroupsByOwner", {
        userId: args.userId,
    });
}

export function findPartGroups(args) {
    return instance.post("/group/findPartGroups", {
        userId: args.userId,
    });
}

export function findPartGroupsId(args) {
    return instance.post("/group/findPartGroupsId", {
        userId: args.userId,
    });
}

export function findGroupById(args) {
    return instance.post("/group/findGroupById", {
        groupId: args.groupId,
    });
}

export function findGroupsByIds(args) {
    return instance.post("/group/findGroupById", {
        groupIds: args.groupIds,
    });
}

export function getAllPublicGroups(args) {
    return instance.post("/group/getAllPublicGroups", {
        userId: args.userId,
    });
}

export function joinGroup(args) {
    return instance.post("/group/joinGroup", {
        userId: args.userId,
        groupId: args.groupId,
    });
}

export function getGroupDetail(args) {
    return instance.post("/group/getGroupDetail", {
        groupId: args.groupId,
    });
}

export function createBlog(args) {
    const { groupId, userId, blogContent, blogImages } = args;
    return instance.post("/blog/createBlog", {
        groupId,
        userId,
        blogContent,
        blogImages,
    });
}

export function createComment(args) {
    const { comment, blogId, userId } = args;
    console.log(comment, blogId, userId);
    return instance.post("/blog/createComment", {
        userId,
        commentContent: comment,
        blogId,
    });
}

export function getAllBlogsByUserId(args) {
    return instance.post("/blog/getAllBlogsByUserId", {
        userId: args.userId,
    });
}

export function getAllMessageByUserId(args) {
    return instance.post("/message/getAllMessageByUserId", {
        userId: args.userId,
    });
}

export function setMessageReaded(args) {
    return instance.post("/message/setMessageReaded", {
        messageId: args.messageId,
    });
}

export function delMessage(args) {
    return instance.post("/message/delMessage", {
        messageId: args.messageId,
    });
}

export function getToken() {
    return instance.post("/test/getToken");
}

export function testJwtAuth() {
    return instance.post("/test/jwtAuth");
}
