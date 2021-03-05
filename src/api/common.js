const common = {
    install(Api, instance) {
        /* 获取公钥 */
        Api.getPublicKey = () => {
            return instance.post("/common/getPublicKey");
        };

        /* 上传图片 */
        Api.uploadImg = (args) => {
            const data = new FormData();
            const { file, fileName } = args;
            data.append("fileName", fileName);
            data.append("file", file);

            return instance.post("/common/uploadImg", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        };

        /* 获取用户资料 */
        Api.getInfoByUserId = (args) => {
            return instance.post("/common/getInfoByUserId", {
                userId: args.userId,
            });
        };

        /* 更新用户资料 */
        Api.updateUserInfo = (args) => {
            const {
                userId,
                avatar,
                background,
                city,
                gender,
                intro,
                nickName,
            } = args;
            return instance.post("/common/updateUserInfo", {
                userId,
                avatar,
                background,
                city,
                gender,
                intro,
                nickName,
            });
        };
    },
};

export default common;
