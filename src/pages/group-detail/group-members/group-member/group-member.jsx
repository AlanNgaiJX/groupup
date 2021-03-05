import React from "react";
import classnames from "classnames";
import Avatar from "@/components/avatar/avatar.jsx";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import "./group-member.scss";

class GroupMember extends React.Component {
    render() {
        const { user, size } = this.props;
        return (
            <li className={classnames(["group-member", size])}>
                <div className="avatar-wrap">
                    <Avatar avatarId={user.userInfo.avatar} />
                </div>

                <div className="nickName">{user.userInfo.nickName}</div>

                {user.isGroupOwner ? (
                    <div className="role-mark">
                        <SvgIcon
                            name="crown"
                            className="role-mark-icon"
                        ></SvgIcon>
                    </div>
                ) : (
                    ""
                )}
            </li>
        );
    }
}

export default GroupMember;
