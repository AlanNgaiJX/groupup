import React from "react";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import "./nav-footer.scss";

class NavFooter extends React.Component {
    render() {
        return (
            <div className="nav-footer">
                <div className="footer-item">
                    <SvgIcon name="home" className="item-icon home"></SvgIcon>
                    <p>首页</p>
                </div>
                <div className="footer-item">
                    <SvgIcon name="group" className="item-icon group"></SvgIcon>
                    <p>小组</p>
                </div>
                <div className="footer-item">
                    <SvgIcon name="me" className="item-icon me"></SvgIcon>
                    <p>我</p>
                </div>
            </div>
        );
    }
}

export default NavFooter;
