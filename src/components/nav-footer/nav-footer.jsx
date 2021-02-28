import React from "react";
import NavItem from "./nav-item.jsx";
import "./nav-footer.scss";

class NavFooter extends React.Component {
    navList = [
        {
            path: "/home",
            icon: "home",
            text: "首页",
        },
        {
            path: "/group",
            icon: "group",
            text: "小组",
        },
        {
            path: "/me",
            icon: "me",
            text: "我",
        },
    ];
    isActive = (path) => {
        return this.props.path === path;
    };

    render() {
        return (
            <div className="nav-footer">
                {this.navList.map((item, index) => (
                    <NavItem
                        key={index}
                        path={item.path}
                        icon={item.icon}
                        text={item.text}
                        isActive={this.isActive(item.path)}
                    ></NavItem>
                ))}
            </div>
        );
    }
}

export default NavFooter;
