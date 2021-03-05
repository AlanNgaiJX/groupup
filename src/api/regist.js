const regist = {
    install(Api, instance) {
        Api.postRegist = (args) => {
            const { phone, password, vcode } = args;
            return instance.post("/regist", {
                phone,
                password,
                vcode,
            });
        };
    },
};

export default regist;
