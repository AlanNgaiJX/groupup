import React from "react";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import "./avatar.scss";

class Avatar extends React.Component {
    render() {
        return (
            <div className="avatar">
                <SvgIcon name={`avatar-${this.props.avatarId}`}></SvgIcon>
            </div>
        );
    }
}

export default Avatar;