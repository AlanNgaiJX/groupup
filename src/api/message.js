const message = {
    install(Api, instance) {
        /* 获取用户所有消息 */
        Api.getAllMessageByUserId = (args) => {
            return instance.post("/message/getAllMessageByUserId", {
                userId: args.userId,
            });
        };

        /* 设置消息已读 */
        Api.setMessageReaded = (args) => {
            return instance.post("/message/setMessageReaded", {
                messageId: args.messageId,
            });
        };

        /* 删除消息 */
        Api.delMessage = (args) => {
            return instance.post("/message/delMessage", {
                messageId: args.messageId,
            });
        };
    },
};

export default message;
