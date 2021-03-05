import React from "react";
import Avatar from "@/components/avatar/avatar.jsx";
import FoldableContent from "../foldable-content/foldable-content.jsx";
import BlogImages from "../blog-images/blog-images.jsx";
import BlogFooter from "../blog-footer/blog-footer.jsx";
import { remToPx } from "@/units/utilsUnit.js";
import "./group-blog.scss";

class GroupBlog extends React.Component {
    render() {
        const { blog } = this.props;
        const {
            _id,
            blogAuthor,
            blogContent,
            comments,
            blogImages,
            createdAt,
        } = blog;
        return (
            <div className="group-blog">
                <div className="left-avatar">
                    <div className="avatar-wrap">
                        <Avatar avatarId={blogAuthor.userInfo.avatar}></Avatar>
                    </div>
                </div>
                <div className="right-main">
                    <p className="nickName">{blogAuthor.userInfo.nickName}</p>
                    <div className="blogContent">
                        <FoldableContent
                            limitHeight={remToPx(1.9)}
                            style={{ lineHeight: ".38rem", fontSize: ".28rem" }}
                        >
                            {blogContent}
                        </FoldableContent>
                    </div>

                    <BlogImages blogImages={blogImages} />

                    <BlogFooter
                        blogId={_id}
                        createdAt={createdAt}
                        comments={comments}
                    ></BlogFooter>
                </div>
            </div>
        );
    }
}

export default GroupBlog;
