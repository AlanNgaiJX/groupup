import React from "react";
import { connect } from "react-redux";
import MeCard from "./me-card/me-card.jsx";
import MeTabs from "./me-tabs/me-tabs.jsx";
import NavFooter from "@/components/nav-footer/nav-footer.jsx";
import Api from "@/api/index.js";
import modal from "@/units/modalUnit.js";
import { delCookie } from "@/units/utilsUnit.js";
import { dropByCacheKey } from 'react-router-cache-route'
import {updateUserId} from "@/redux/actionCreater.js";
const mapState = (state) => ({
    userId: state.userId,
});

const mapDispatch = {
    updateUserId
};

class MeUI extends React.Component {
    state = {
        userInfo: {
            loading: true,
            avatar: 0,
            nickName: "",
            intro: "",
            gender: 0,
            background: "",
            city: "",
        },

        myBlogs: [],
        myBlogsLoading: true,

        myMessages: [],
        myMessagesLoading: true,
    };

    fetchData = () => {
        const userId = this.props.userId;
        Api.getInfoByUserId({ userId }).then((res) => {
            if (res.data.code === 200) {
                modal.hideLoading();
                const {
                    nickName,
                    intro,
                    gender,
                    avatar,
                    background,
                    city,
                } = res.data.data;

                const userInfo = {
                    nickName,
                    intro,
                    gender,
                    avatar,
                    background,
                    city,
                    loading: false,
                };

                this.setState({
                    userInfo,
                });
            }
        });

        Api.getAllBlogsByUserId({
            userId: userId,
        }).then((res) => {
            if (res.data.code === 200) {
                this.setState({
                    myBlogs: res.data.data,
                    myBlogsLoading: false,
                });
            }
        });

        Api.getAllMessageByUserId({
            userId,
        }).then((res) => {
            if (res.data.code === 200) {
                this.setState({
                    myMessages: res.data.data,
                    myMessagesLoading: false,
                });
            }
        });
    };

    logout = () => {
        delCookie("userId");
        delCookie("token");
        dropByCacheKey("home");
        dropByCacheKey("group");
        dropByCacheKey("me");
        this.props.updateUserId("");
        this.props.history.replace("/login");
    };

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        this.fetchData();
    }

    componentWillUnmount = () => {
        this.setState = () => {
            return;
        };
    };

    render() {
        const {
            userInfo,
            myBlogs,
            myBlogsLoading,
            myMessages,
            myMessagesLoading,
        } = this.state;
        const { userId } = this.props;
        return (
            <div id="page-me">
                <MeCard
                    userInfo={userInfo}
                    userId={userId}
                    logout={this.logout}
                ></MeCard>
                <MeTabs
                    myBlogs={myBlogs}
                    myBlogsLoading={myBlogsLoading}
                    myMessages={myMessages}
                    myMessagesLoading={myMessagesLoading}
                ></MeTabs>
                <NavFooter
                    path={this.props.history.location.pathname}
                ></NavFooter>
            </div>
        );
    }
}

const MeContainer = connect(mapState, mapDispatch)(MeUI);

export default MeContainer;
