import React from "react";
import { connect } from "react-redux";
import { Icon, WhiteSpace, NavBar } from "antd-mobile";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import GroupItem from "@/components/group-item/group-item.jsx";
import Api from "@/api/index.js";
import modal from "@/units/modalUnit.js";
import "./my-group.scss";

const mapState = (state) => ({
    userId: state.userId,
});

const mapDispatch = {};

class MyGroupUI extends React.Component {
    state = {
        myGroups: [],
    };

    toCreateGroup = () => {
        this.props.history.push("/group/create-group");
    };

    goBack = () => {
        this.props.history.goBack();
    };

    componentDidMount() {
        const { userId } = this.props;
        Api.findGroupsByOwner({
            userId,
        }).then((res) => {
            if (res.data.code === 200) {
                this.setState({
                    myGroups: res.data.data,
                });
            } else {
                modal.showToast({
                    title: "findGroupsByOwner" + res.data.msg,
                });
            }
        });
    }

    componentWillUnmount = () => {
        this.setState = () => {
            return;
        };
    };

    render() {
        const { myGroups } = this.state;
        return (
            <div id="my-group-page">
                  <div className="navBarWrap">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={this.goBack}
                    >
                        我的群组
                    </NavBar>
                </div>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>

                <div className="label-bar">
                    <div className="label-text"></div>
                    <div className="right-btn"  onClick={this.toCreateGroup}>
                        创建小组
                        <Icon type="right" />
                    </div>
                </div>

                <div className="my-group-wrap">
                    <ul className="my-groups">
                        {myGroups.length ? (
                            myGroups.map((item) => (
                                <li className="my-groups-item" key={item._id}>
                                    <GroupItem group={item}></GroupItem>
                                </li>
                            ))
                        ) : (
                            <li className="my-groups-item empty">
                                <SvgIcon
                                    name="empty"
                                    className="empty-icon"
                                ></SvgIcon>
                                空空如也，创建你的群组吧
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

const MyGroupContainer = connect(mapState, mapDispatch)(MyGroupUI);

export default MyGroupContainer;
