import React from "react";
import classnames from "classnames";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import { withRouter } from 'react-router'
import "./nav-item.scss";

class NavItem extends React.Component {
    routeTo = (path) => () => {
        this.props.history.push(path);
    };

    render() {
        const { isActive, path, icon, text } = this.props;
        return (
            <div
                className={classnames([
                    "footer-item",
                    isActive ? "active" : "default",
                ])}
                onClick={this.routeTo(path)}
            >
                <SvgIcon name={icon} className="item-icon"></SvgIcon>
                <p>{text}</p>
            </div>
        );
    }
}

export default withRouter(NavItem);
