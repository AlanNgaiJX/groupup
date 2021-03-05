import React from "react";
import GroupMember from "./group-member/group-member.jsx";
import "./group-members.scss";

class GroupMembers extends React.Component {
    render() {
        const { groupMembers, groupOwner } = this.props;
        groupMembers.forEach((item) => {
            if (item._id === groupOwner._id) {
                item.isGroupOwner = true;
            }
        });
        groupMembers.sort((a, b) => {
            const aVal = a.isGroupOwner ? 1 : 0;
            const bVal = b.isGroupOwner ? 1 : 0;
            return bVal - aVal;
        });

        return (
            <ul className="group-members">
                {groupMembers.length ? (
                    groupMembers.map((item) => {
                        return (
                            <GroupMember
                                key={item._id}
                                user={item}
                                size="md"
                            ></GroupMember>
                        );
                    })
                ) : (
                    // 没有群员
                    <></>
                )}
            </ul>
        );
    }
}

export default GroupMembers;
