import React from "react";
import { Icon } from "antd-mobile";
import "./full-intro.scss";

class FullIntro extends React.Component {
    fullIntro = React.createRef();

    touchMoveCb = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    componentDidMount() {
        this.fullIntro.current.addEventListener("touchmove", this.touchMoveCb);
    }

    componentWillUnmount() {
        this.fullIntro.current.removeEventListener(
            "touchmove",
            this.touchMoveCb
        );
    }

    render() {
        return (
            <div className="full-intro" ref={this.fullIntro}>
                <div className="btn-close" onClick={this.props.hideGroupIntro}>
                    <Icon type="cross" size="lg" color="grey" />
                </div>
                <div className="intro-wrap">
                    <div className="title">群组简介：</div>
                    <div className="content">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default FullIntro;
