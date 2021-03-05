import React from "react";
import { withRouter } from "react-router";
import SquareImg from "@/components/square-img/square-img.jsx";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import "./group-item.scss";

class GroupItem extends React.Component {
    handleJoinGroup = (groupId) => (e) => {
        e.stopPropagation();
        const { joinGroup } = this.props;
        joinGroup && (typeof joinGroup === "function") && joinGroup(groupId);
    };

    toDetail = () => {
        const { group } = this.props;
        this.props.history.push(`/group-detail?groupId=${group._id}`);
    };

    render() {
        const { group } = this.props;
        return (
            <div className="group-item" onClick={this.toDetail}>
                <div className="group-item-main">
                    <div className="group-item-info">
                        <div className="cover">
                            <SquareImg src={group.groupCover} round host />
                        </div>
                        <div className="text-info">
                            <p className="group-name">{group.groupName}</p>
                            <p className="member-count">
                                {group.groupMembers.length}人
                            </p>
                        </div>
                    </div>
                    <div className="group-item-option">
                        {group.isPartIn || this.props.ignoreIsPartIn ? (
                            <div className="btn-check">
                                <SvgIcon
                                    name="check"
                                    className="btn-check-icon"
                                ></SvgIcon>
                                已加入
                            </div>
                        ) : (
                            <div
                                className="btn-join"
                                onClick={this.handleJoinGroup(group._id)}
                            >
                                <SvgIcon
                                    name="add"
                                    className="btn-join-icon"
                                ></SvgIcon>
                                加入
                            </div>
                        )}
                    </div>
                </div>
                {group.groupBlogs.length ? (
                    <div className="summary-blogs-wrap">
                        <ul className="summary-blogs">
                            {group.groupBlogs.slice(0, 2).map((item) => {
                                return (
                                    <li
                                        className="summary-blog-item"
                                        key={item._id}
                                    >
                                        <div className="comment-count">
                                            <SvgIcon
                                                name="comment"
                                                className="comment-count-icon"
                                            ></SvgIcon>
                                            {item.comments.length}
                                        </div>
                                        <p>{item.blogContent}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default withRouter(GroupItem);
