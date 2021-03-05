import React from "react";
import Avatar from "@/components/avatar/avatar.jsx";
import FoldableContent from "../../foldable-content/foldable-content.jsx";
import moment from "@/units/momentUnit.js";
import { remToPx } from "@/units/utilsUnit.js";
import "./comment-list.scss";

class CommentList extends React.Component {
    state = {
        needFoldUp: false,
        folded: false,
        setUp: false,
    };

    fold = () => {
        this.setState({
            folded: true,
        });
    };

    expand = () => {
        this.setState({
            folded: false,
        });
    };

    componentDidUpdate() {
        const { setUp } = this.state;
        const { comments } = this.props;
        if (comments.length > 3 && !setUp) {
            this.setState({
                needFoldUp: true,
                folded: true,
                setUp: true,
            });
        }
    }

    render() {
        const { comments } = this.props;
        const { needFoldUp, folded } = this.state;
        const commentList = folded ? comments.slice(0, 3) : comments;
        return (
            <>
                {comments.length ? (
                    <>
                        <ul className="comment-list">
                            {commentList.map((item) => {
                                return (
                                    <li className="comment-item" key={item._id}>
                                        <div className="comment-avatar">
                                            <Avatar
                                                avatarId={
                                                    item.commentAuthor.userInfo
                                                        .avatar
                                                }
                                            ></Avatar>
                                        </div>
                                        <div className="comment-info">
                                            <div className="comment-nickname">
                                                {
                                                    item.commentAuthor.userInfo
                                                        .nickName
                                                }
                                            </div>
                                            <div className="comment-content">
                                                <FoldableContent
                                                    limitHeight={remToPx(1.9)}
                                                    style={{
                                                        lineHeight: ".38rem",
                                                        fontSize: ".26rem",
                                                    }}
                                                >
                                                    {item.commentContent}
                                                </FoldableContent>
                                            </div>
                                            <div className="comment-time">
                                                {moment(
                                                    item.createdAt
                                                ).fromNow()}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        {needFoldUp ? (
                            <div className="needFoldUp">
                                {folded ? (
                                    <div onClick={this.expand}>查看全部</div>
                                ) : (
                                    <div onClick={this.fold}>收起</div>
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                    </>
                ) : (
                    ""
                )}
            </>
        );
    }
}

export default CommentList;
