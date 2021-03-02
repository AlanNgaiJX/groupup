import React from "react";
import { connect } from "react-redux";
import NavFooter from "@/components/nav-footer/nav-footer.jsx";
import GroupItem from "@/components/group-item/group-item.jsx";
import { Icon, WhiteSpace } from "antd-mobile";
import "./home.scss";
import * as Api from "@/api/index.js";

const mapState = (state) => ({
    userId: state.userId,
});
const mapDispatch = {};

class HomeUI extends React.Component {
    state = {
        publicGroups: [],
    };

    joinGroup = (groupId) => () => {
        console.log(groupId);
        Api.joinGroup({
            userId: this.props.userId,
            groupId,
        }).then(res=>{
            if (res.data.code === 200) {
                
            }
        });
    };

    componentDidMount() {
        Api.getAllPublicGroups({
            userId: this.props.userId,
        }).then((res) => {
            if (res.data.code === 200) {
                this.setState({
                    publicGroups: res.data.data,
                });
            }
        });
    }

    render() {
        const { publicGroups } = this.state;
        return (
            <div id="home-page">
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>

                {/* 广场 */}
                <div className="label-bar">
                    <div className="label-text">广场</div>
                    <div className="right-btn">
                        全部
                        <Icon type="right" />
                    </div>
                </div>
                <div className="public-group-wrap">
                    <ul className="public-groups">
                        {publicGroups.map((item) => {
                            return (
                                <li
                                    className="public-groups-item"
                                    key={item._id}
                                >
                                    <GroupItem
                                        group={item}
                                        joinGroup={this.joinGroup}
                                    ></GroupItem>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <NavFooter
                    path={this.props.history.location.pathname}
                ></NavFooter>
            </div>
        );
    }
}

const HomeContainer = connect(mapState, mapDispatch)(HomeUI);

export default HomeContainer;
