import React from "react";
import { withRouter } from "react-router";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import Avatar from "@/components/avatar/avatar.jsx";
import "./me-card.scss";
import * as Api from "@/api/index.js";
import modal from "@/units/modalUnit.js";
const userId = "603662756f354a14a47a7a20";

class MeCard extends React.Component {
    state = {
        loading: true,
        avatar: 0,
        nickName: "",
        intro: "",
        gender: 0,
        background: "",
        city: "",
    };

    bgStyle = (background) => {
        if (this.state.loading) {
            return {};
        }
        const match = background.match(/^rgb\((.+)\)/);
        const color = (match && match[1]) || "135,0,255";
        return {
            backgroundImage: `linear-gradient(
                -225deg,
                rgba(${color}, 0.7) 0%,
                rgba(${color}, 0.3) 100%
            )`,
        };
    };

    toEdit = () => {
        this.props.history.push("/me/info", {
            userId,
        });
    };

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        modal.showLoading();
        this.setState({
            loading: true,
        });
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
                this.setState({
                    nickName,
                    intro,
                    gender,
                    avatar,
                    background,
                    city,
                    loading: false,
                });
            } else {
                modal.showToast({ title: res.data.msg });
            }
        });
    }

    render() {
        const {
            nickName,
            intro,
            gender,
            avatar,
            background,
            city,
            loading,
        } = this.state;
        return (
            <div id="me-card" style={this.bgStyle(background)}>
                <div className="avatar-wrap">
                    {!loading && <Avatar avatarId={avatar}></Avatar>}
                </div>
                <div className="info">
                    <div className="nickName">
                        {nickName}
                        {(() => {
                            switch (gender) {
                                case 1:
                                    return (
                                        <SvgIcon
                                            name="man"
                                            className="gender-icon"
                                        ></SvgIcon>
                                    );
                                case 2:
                                    return (
                                        <SvgIcon
                                            name="woman"
                                            className="gender-icon"
                                        ></SvgIcon>
                                    );
                                default:
                                    break;
                            }
                        })()}
                    </div>
                    <div className="intro">{intro}</div>
                </div>
                <div className="location">
                    <SvgIcon
                        name="location"
                        className="location-icon"
                    ></SvgIcon>
                    {city}
                </div>
                <div className="btn-edit" onClick={this.toEdit}>
                    <SvgIcon name="edit" className="btn-edit-icon"></SvgIcon>
                </div>
            </div>
        );
    }
}

export default withRouter(MeCard);
