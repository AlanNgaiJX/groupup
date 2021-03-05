import React from "react";
import classnames from "classnames";
import SquareImg from "@/components/square-img/square-img.jsx";
import "./sum-info.scss";

class SumInfo extends React.Component {
    render() {
        const size = this.props.size || "md";
        const { groupCover, groupName, groupMemberCount } = this.props;
        return (
            <div className={classnames(["sum-info", size])}>
                <div className="group-cover">
                    <SquareImg
                        src={groupCover}
                        round
                        host
                    ></SquareImg>
                </div>
                <div className="info">
                    <div className="group-name">
                        {groupName}
                    </div>
                    <div className="member-count">{groupMemberCount} 人</div>
                </div>
            </div>
        );
    }
}

export default SumInfo;
