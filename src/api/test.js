const test = {
    install(Api, instance) {
        /* 获取token */
        Api.getToken = () => {
            return instance.post("/test/getToken");
        };

        /* 测试jwt验证 */
        Api.testJwtAuth = () => {
            return instance.post("/test/jwtAuth");
        };
    },
};

export default test;
