import React from "react";
import { connect } from "react-redux";
import moment from "@/units/momentUnit.js";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import CommentList from "./commentList/comment-list.jsx";
import { TextareaItem } from "antd-mobile";
import * as Api from "@/api/index.js";
import modal from "@/units/modalUnit.js";
import "./blog-footer.scss";

const mapState = (state) => ({
    userId: state.userId,
});

const mapDispatch = {};

class BlogFooterUI extends React.Component {
    state = {
        commentEdit: false,
        comment: "",
        comments: [],
    };

    onChangeComment = (value) => {
        this.setState({
            comment: value,
        });
    };

    clickComment = () => {
        this.setState({
            commentEdit: true,
            comment: "",
        });
    };

    cancleEdit = () => {
        this.setState({
            commentEdit: false,
            comment: "",
        });
    };

    clickLike = () => {};

    sendComment = () => {
        const { comment } = this.state;
        const { blogId, userId } = this.props;
        if (comment.trim() === "") {
            modal.showToast({
                title: "请检查",
            });
            return;
        }
        modal.showLoading();
        Api.createComment({
            comment,
            blogId,
            userId,
        }).then((res) => {
            modal.hideLoading();
            if (res.data.code === 200) {
                const comment = res.data.data;
                this.setState({
                    comments: [...this.state.comments, comment],
                });
            } else {
                modal.showToast({
                    title: res.data.msg,
                });
            }
            this.setState({
                commentEdit: false,
                comment: "",
            });
        });
    };

    componentDidMount() {
        const { comments } = this.props;
        this.setState({
            comments,
        });
    }

    componentWillUnmount = () => {
        this.setState = () => {
            return;
        };
    };

    render() {
        const { createdAt } = this.props;
        const { commentEdit, comment, comments } = this.state;
        return (
            <div className="blog-footer">
                <div className="blog-option">
                    <div className="time">{moment(createdAt).fromNow()}</div>
                    <div className="option-groups">
                        {/* <div
                            className="like option-item"
                            onClick={this.clickLike}
                        >
                            <SvgIcon name="like" className="icon like-icon" />
                            <span className="count">1</span>
                        </div> */}
                        <div
                            className="comment option-item"
                            onClick={this.clickComment}
                        >
                            <SvgIcon
                                name="comment-pure"
                                className="icon comment-icon"
                            />
                            <span className="count">{comments.length}</span>
                        </div>
                    </div>
                </div>

                {commentEdit ? (
                    <div className="comment-form">
                        <div className="comment-input">
                            <TextareaItem
                                rows={3}
                                count={50}
                                value={comment}
                                onChange={this.onChangeComment}
                                clear
                            />
                        </div>
                        <div className="btn-group">
                            <div
                                className="btn btn-cancle"
                                onClick={this.cancleEdit}
                            >
                                取消
                            </div>
                            <div
                                className="btn btn-submit"
                                onClick={this.sendComment}
                            >
                                发送
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}

                <CommentList comments={comments}></CommentList>
            </div>
        );
    }
}

const BlogFooterContainer = connect(mapState, mapDispatch)(BlogFooterUI);

export default BlogFooterContainer;
