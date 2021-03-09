import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Icon, WhiteSpace, PullToRefresh } from "antd-mobile";
import axios from "axios";
import NavFooter from "@/components/nav-footer/nav-footer.jsx";
import SquareImg from "@/components/square-img/square-img.jsx";
import GroupItem from "@/components/group-item/group-item.jsx";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import Api from "@/api/index.js";
import "./group.scss";
import modal from "@/units/modalUnit.js";

const mapState = (state) => ({
    userId: state.userId,
    refreshGroup: state.refreshGroup
});

const mapDispatch = {};

class GroupUI extends React.Component {
    state = {
        myGroups: [],
        myParts: [],
        refreshing: false,
    };

    toCreateGroup = () => {
        this.props.history.push("/group/create-group");
    };

    toMyAllGroups = () => {
        this.props.history.push("/group/my-group");
    };

    fetchData = (cb) => {
        const { userId } = this.props;
        return new Promise((resolve) => {
            axios
                .all([
                    Api.findGroupsByOwner({
                        userId,
                    }),
                    Api.findPartGroups({ userId }),
                ])
                .then(
                    axios.spread((res_ownerGroups, res_partGroups) => {
                        if (res_ownerGroups.data.code === 200) {
                            this.setState({
                                myGroups: res_ownerGroups.data.data.slice(0, 5),
                            });
                        }
                        if (res_partGroups.data.code === 200) {
                            this.setState({
                                myParts: res_partGroups.data.data,
                            });
                        }

                        resolve();
                    })
                );
        });
    };

    pullRefresh = () => {
        this.setState({
            refreshing: true,
        });
        this.fetchData().then(() => {
            // 为了更好体验，下拉刷新动画至少持续一秒
            setTimeout(() => {
                this.setState({
                    refreshing: false,
                });
            }, 1000);
        });
    };

    toDetail = (groupId) => () => {
        this.props.history.push(`/group-detail?groupId=${groupId}`);
    };

    componentDidMount() {
        modal.showLoading();
        this.fetchData().then(()=>{
            modal.hideLoading();
        });
    }

    componentWillUnmount = () => {
        this.setState = () => {
            return;
        };
    };

    render() {
        const { myGroups, myParts, refreshing } = this.state;
        return (
            <div id="group-page">
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
                    {/* 我的小组 */}
                    <div className="label-bar">
                        <div className="label-text">我的小组</div>
                        <div className="right-btn" onClick={this.toMyAllGroups}>
                            全部
                            <Icon type="right" />
                        </div>
                    </div>

                    <div className="my-groups-wrap">
                        <ul className="my-groups">
                            {myGroups.length ? (
                                myGroups.map((item) => {
                                    return (
                                        <li
                                            className="my-groups-item"
                                            key={item._id}
                                            onClick={this.toDetail(item._id)}
                                        >
                                            <div className="cover-wrap">
                                                <SquareImg
                                                    src={item.groupCover}
                                                    round
                                                    host
                                                />
                                            </div>
                                            <p>{item.groupName}</p>
                                        </li>
                                    );
                                })
                            ) : (
                                <li className="my-groups-item empty">
                                    <SvgIcon
                                        name="empty"
                                        className="empty-icon"
                                    ></SvgIcon>
                                    空空如也，先去创建群组吧
                                </li>
                            )}
                        </ul>
                    </div>
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace></WhiteSpace>

                    {/* 我的参与 */}
                    <div className="label-bar">
                        <div className="label-text">我已加入</div>
                        <div className="right-btn" onClick={this.toCreateGroup}>
                            创建小组
                            <Icon type="right" />
                        </div>
                    </div>
                    <div className="my-part-wrap">
                        <ul className="my-parts">
                            {myParts.length ? (
                                myParts.map((item, index) => (
                                    <Fragment key={item._id}>
                                        <li className="my-parts-item">
                                            <GroupItem
                                                group={item}
                                                ignoreIsPartIn
                                            ></GroupItem>
                                        </li>
                                        {index === myParts.length - 1 ? (
                                            <li className="my-parts-item nomore">
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
                                ))
                            ) : (
                                <li className="my-parts-item empty">
                                    <SvgIcon
                                        name="empty"
                                        className="empty-icon"
                                    ></SvgIcon>
                                    空空如也，先去逛逛吧
                                </li>
                            )}
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

const GroupContainer = connect(mapState, mapDispatch)(GroupUI);

export default GroupContainer;
