import React from "react";
import { connect } from "react-redux";
import MeCard from "./me-card/me-card.jsx";
import MeTabs from "./me-tabs/me-tabs.jsx";
import NavFooter from "@/components/nav-footer/nav-footer.jsx";
import * as Api from "@/api/index.js";
import modal from "@/units/modalUnit.js";

const mapState = (state) => ({
    userId: state.userId,
});

const mapDispatch = {};

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
    };
    componentDidMount() {
        document.documentElement.scrollTop = 0;
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
            } else {
                modal.showToast({ title: res.data.msg });
            }
        });
    }

    render() {
        const { userInfo } = this.state;
        const { userId } = this.props;
        return (
            <div id="page-me">
                <MeCard userInfo={userInfo} userId={userId}></MeCard>
                <MeTabs></MeTabs>
                <NavFooter
                    path={this.props.history.location.pathname}
                ></NavFooter>
            </div>
        );
    }
}

const MeContainer = connect(mapState, mapDispatch)(MeUI);

export default MeContainer;
