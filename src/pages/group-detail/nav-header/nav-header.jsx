import React from "react";
import { withRouter } from "react-router";
import { Icon } from "antd-mobile";
import SumInfo from "../sum-info/sum-info.jsx";
import { remToPx } from "@/units/utilsUnit.js";
import "./nav-header.scss";

class NavHeader extends React.Component {
    state = {
        showNavSum: false,
    };
    
    clickLeft = () => {
        this.props.history.goBack();
    };

    componentDidMount() {
        window.addEventListener("scroll", (e) => {
            if (document.documentElement.scrollTop > remToPx(3.5)) {
                this.setState({
                    showNavSum: true,
                });
            } else {
                this.setState({
                    showNavSum: false,
                });
            }
        });
    }
    render() {
        const { group, bgc } = this.props;
        const { showNavSum } = this.state;
        return (
            <div className="nav-header" style={{ backgroundColor: bgc }}>
                <div className="left" onClick={this.clickLeft}>
                    <Icon type="left" color="#bbb" size="lg" />
                </div>
                <div className="middle">
                    {group.loading ? (
                        ""
                    ) : (
                        <div
                            className="sum-info-wrap"
                            style={{ opacity: showNavSum ? 1 : 0 }}
                        >
                            <SumInfo
                                size="md"
                                groupCover={group.groupCover}
                                groupName={group.groupName}
                                groupMemberCount={group.groupMembers.length}
                            ></SumInfo>
                        </div>
                    )}
                </div>
                <div className="right"></div>
            </div>
        );
    }
}

export default withRouter(NavHeader);
