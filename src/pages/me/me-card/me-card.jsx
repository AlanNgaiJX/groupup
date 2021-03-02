import React from "react";
import { withRouter } from "react-router";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import Avatar from "@/components/avatar/avatar.jsx";
import "./me-card.scss";
import { delCookie } from "@/units/utilsUnit.js";

class MeCard extends React.Component {
    bgStyle = (background) => {
        if (this.props.userInfo.loading) {
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
            userId: this.props.userId,
        });
    };

    logout = () => {
        delCookie("userId");
        delCookie("token");
        this.props.history.replace("/login");
    };

    render() {
        const {
            nickName,
            intro,
            gender,
            avatar,
            background,
            city,
            loading,
        } = this.props.userInfo;
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
                <div className="btn-logout" onClick={this.logout}>
                    <SvgIcon
                        name="logout"
                        className="btn-logout-icon"
                    ></SvgIcon>
                </div>
            </div>
        );
    }
}

export default withRouter(MeCard);
