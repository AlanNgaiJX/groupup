const blog = {
    install(Api, instance) {
        /* 发表动态 */
        Api.createBlog = (args) => {
            const { groupId, userId, blogContent, blogImages } = args;
            return instance.post("/blog/createBlog", {
                groupId,
                userId,
                blogContent,
                blogImages,
            });
        };

        /* 发表评论 */
        Api.createComment = (args) => {
            const { comment, blogId, userId } = args;
            console.log(comment, blogId, userId);
            return instance.post("/blog/createComment", {
                userId,
                commentContent: comment,
                blogId,
            });
        };

        /* 获取用户所有动态 */
        Api.getAllBlogsByUserId = (args) => {
            return instance.post("/blog/getAllBlogsByUserId", {
                userId: args.userId,
            });
        };
    },
};

export default blog;
