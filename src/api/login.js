const login = {
    install(Api, instance) {
        Api.loginByPwd = (args) => {
            const { phone, password } = args;
            return instance.post("/login/loginByPwd", {
                phone,
                password,
            });
        };
    },
};

export default login;
