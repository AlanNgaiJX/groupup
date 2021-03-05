const group = {
    install(Api, instance) {
        /* 创建群组 */
        Api.createGroup = (args) => {
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
        };

        /* 获取用户创建的群组 */
        Api.findGroupsByOwner = (args) => {
            return instance.post("/group/findGroupsByOwner", {
                userId: args.userId,
            });
        };

        /* 获取用户参加的群组 */
        Api.findPartGroups = (args) => {
            return instance.post("/group/findPartGroups", {
                userId: args.userId,
            });
        };

        /* 根据[群组Id]查找已参与[群组] */
        Api.findPartGroupsId = (args) => {
            return instance.post("/group/findPartGroupsId", {
                userId: args.userId,
            });
        };

        /* 根据群组Id查找群组 */
        Api.findGroupById = (args) => {
            return instance.post("/group/findGroupById", {
                groupId: args.groupId,
            });
        };

        /* 根据[群组Id]查找[群组] */
        Api.findGroupsByIds = (args) => {
            return instance.post("/group/findGroupById", {
                groupIds: args.groupIds,
            });
        };

        /* 获取所有公开群组 */
        Api.getAllPublicGroups = (args) => {
            return instance.post("/group/getAllPublicGroups", {
                userId: args.userId,
            });
        };

        /* 加入群组 */
        Api.joinGroup = (args) => {
            return instance.post("/group/joinGroup", {
                userId: args.userId,
                groupId: args.groupId,
            });
        };

        /* 获取群组详细信息 */
        Api.getGroupDetail = (args) => {
            return instance.post("/group/getGroupDetail", {
                groupId: args.groupId,
            });
        };
    },
};

export default group;
