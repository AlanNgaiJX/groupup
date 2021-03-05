import React, { Fragment } from "react";
import { connect } from "react-redux";
import { WhiteSpace, PullToRefresh } from "antd-mobile";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import NavFooter from "@/components/nav-footer/nav-footer.jsx";
import GroupItem from "@/components/group-item/group-item.jsx";
import "./home.scss";
import Api from "@/api/index.js";

const mapState = (state) => ({
    userId: state.userId,
});
const mapDispatch = {};

class HomeUI extends React.Component {
    state = {
        publicGroups: [],
        refreshing: false,
    };

    joinGroup = (groupId) => {
        const { publicGroups } = this.state;
        Api.joinGroup({
            userId: this.props.userId,
            groupId,
        }).then((res) => {
            if (res.data.code === 200) {
                const target = publicGroups.find(
                    (item) => item._id === groupId
                );
                target && (target.isPartIn = true);
                this.setState({
                    publicGroups: publicGroups,
                });
            }
        });
    };

    getAllPublicGroups = (cb) => {
        Api.getAllPublicGroups({
            userId: this.props.userId,
        }).then((res) => {
            if (res.data.code === 200) {
                this.setState({
                    publicGroups: res.data.data,
                });
            }
            cb && typeof cb === "function" && cb();
        });
    };

    pullRefresh = () => {
        this.setState({
            refreshing: true,
        });

        this.getAllPublicGroups(() => {
            // 为了更好体验，下拉刷新动画至少持续一秒
            setTimeout(() => {
                this.setState({
                    refreshing: false,
                });
            }, 1000);
        });
    };

    componentDidMount() {
        this.getAllPublicGroups();
    }

    componentWillUnmount = () => {
        this.setState = () => {
            return;
        };
    };

    render() {
        const { publicGroups, refreshing } = this.state;
        return (
            <div id="home-page">
                <PullToRefresh
                    damping={60}
                    ref={(el) => (this.ptr = el)}
                    style={{
                        position: "fixed",
                        width: "100%",
                        top: "0",
                        bottom: "1rem", // footer high 1rem
                        overflow: "auto",
                    }}
                    direction="down"
                    distanceToRefresh={window.devicePixelRatio * 25}
                    refreshing={refreshing}
                    onRefresh={this.pullRefresh}
                >
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace></WhiteSpace>

                    {/* 广场 */}
                    <div className="label-bar">
                        <div className="label-text">广场</div>
                        <div className="right-btn"></div>
                    </div>
                    <div className="public-group-wrap">
                        <ul className="public-groups">
                            {publicGroups.map((item, index) => {
                                return (
                                    <Fragment key={item._id}>
                                        <li className="public-groups-item">
                                            <GroupItem
                                                group={item}
                                                joinGroup={this.joinGroup}
                                            ></GroupItem>
                                        </li>
                                        {index === publicGroups.length - 1 ? (
                                            <li className="public-groups-item nomore">
                                                <SvgIcon
                                                    name="nomore"
                                                    className="nomore-icon"
                                                ></SvgIcon>
                                                已无更多
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                    </Fragment>
                                );
                            })}
                        </ul>
                    </div>
                </PullToRefresh>
                <NavFooter
                    path={this.props.history.location.pathname}
                ></NavFooter>
            </div>
        );
    }
}

const HomeContainer = connect(mapState, mapDispatch)(HomeUI);

export default HomeContainer;
