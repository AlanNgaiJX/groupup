import React from "react";
import { Icon } from "antd-mobile";
import FullIntro from "./full-intro/full-intro.jsx";
import SumInfo from "../sum-info/sum-info.jsx";
import Skeleton from "@/components/skeleton/skeleton.jsx";
import "./group-card.scss";

class GroupCard extends React.Component {
    state = {
        introFolded: true,
    };

    showGroupIntro = () => {
        this.setState({
            introFolded: false,
        });
    };

    hideGroupIntro = () => {
        this.setState({
            introFolded: true,
        });
    };

    render() {
        const { group, bgc } = this.props;
        const { introFolded } = this.state;
        return (
            <div className="group-card" style={{ backgroundColor: bgc }}>
                <div className="sum-option">
                    {group.loading ? (
                        <Skeleton />
                    ) : (
                        <>
                            <div className="sum-info-wrap">
                                <SumInfo
                                    size="lg"
                                    groupCover={group.groupCover}
                                    groupName={group.groupName}
                                    groupMemberCount={group.groupMembers.length}
                                ></SumInfo>
                            </div>
                            <div className="options">
                                {/* <div className="btn-join"></div> */}
                                <div className="btn-joined">已加入</div>
                            </div>
                        </>
                    )}
                </div>
                <div className="sum-intro">
                    {group.loading ? (
                        <Skeleton />
                    ) : (
                        <>
                            <p>
                                <span className="label">群组简介：</span>
                                {group.groupIntro}
                            </p>
                            <div
                                className="btn-showAll"
                                onClick={this.showGroupIntro}
                            >
                                <Icon type="right" color="#ffffffd0" />
                            </div>
                        </>
                    )}
                </div>

                {introFolded ? (
                    ""
                ) : (
                    <FullIntro hideGroupIntro={this.hideGroupIntro}>
                        {group.groupIntro}
                    </FullIntro>
                )}
            </div>
        );
    }
}

export default GroupCard;
