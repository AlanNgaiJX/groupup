import React from "react";
import { connect } from "react-redux";
import { Icon, WhiteSpace } from "antd-mobile";
import NavFooter from "@/components/nav-footer/nav-footer.jsx";
import SquareImg from "@/components/square-img/square-img.jsx";
import GroupItem from "@/components/group-item/group-item.jsx";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import * as Api from "@/api/index.js";
import modal from "@/units/modalUnit.js";
import "./group.scss";

const mapState = (state) => ({
    userId: state.userId,
});

const mapDispatch = {};

// http://cdn-mmportal.mimoprint.com/60a514ac-d111-11e7-aded-00163e062ada.jpg
// const userId = "603662756f354a14a47a7a20";
class GroupUI extends React.Component {
    state = {
        myGroups: [],
        myParts: [],
    };

    toCreateGroup = () => {
        this.props.history.push("/group/create-group");
    };

    componentDidMount() {
        const { userId } = this.props;
        Api.findGroupsByOwner({
            userId,
        }).then((res) => {
            if (res.data.code === 200) {
                console.log(res.data.data.slice(0, 5));
                this.setState({
                    myGroups: res.data.data.slice(0, 5),
                });
            }
        });

        Api.findPartGroups({ userId }).then((res) => {
            if (res.data.code === 200) {
                this.setState({
                    myParts: res.data.data,
                });
            } else {
                modal.showToast({
                    title: "findPartGroups：" + res.data.msg,
                });
            }
        });
    }

    render() {
        const { myGroups, myParts } = this.state;
        return (
            <div id="group-page">
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                {/* 我的小组 */}
                <div className="label-bar">
                    <div className="label-text">我的小组</div>
                    <div className="right-btn">
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
                            myParts.map((item) => (
                                <li className="my-parts-item" key={item._id}>
                                    <GroupItem group={item} ignoreIsPartIn></GroupItem>
                                </li>
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
                <NavFooter
                    path={this.props.history.location.pathname}
                ></NavFooter>
            </div>
        );
    }
}

const GroupContainer = connect(mapState, mapDispatch)(GroupUI);

export default GroupContainer;
