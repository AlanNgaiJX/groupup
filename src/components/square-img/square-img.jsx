import React from "react";
import LazyLoad from "react-lazyload";
import "./square-img.scss";
import config from "@/config/index.js";

const host = config.host;
class SquareImg extends React.Component {
    state = {
        loading: true,
        imgStyle: {},
    };

    onLoad = (e) => {
        const { clientWidth, clientHeight } = e.target;
        const { full } = this.props;
        const {
            clientWidth: parentWidth,
            clientHeight: parentHeight,
        } = e.target.parentNode;
        const ratio = clientWidth / clientHeight;
        const imgStyle = {};

        // full模式
        if (full) {
            if (clientWidth >= clientHeight) {
                imgStyle.width = "100%";
                imgStyle.transform = `translateY(25%)`;
            } else {
                imgStyle.height = "100%";
                imgStyle.transform = `translateX(25%)`;
            }
        } else {
            if (clientWidth >= clientHeight) {
                imgStyle.height = "100%";
                imgStyle.transform = `translateX(${
                    -(ratio * parentHeight - parentWidth) / 2
                }px)`;
            } else {
                imgStyle.width = "100%";
                imgStyle.transform = `translateY(${
                    -(parentWidth / ratio - parentHeight) / 2
                }px)`;
            }
        }

        this.setState({
            loading: false,
            imgStyle,
        });

        this.props.onLoad &&
            typeof this.props.onLoad === "function" &&
            this.props.onLoad();
    };

    render() {
        const { loading, imgStyle } = this.state;
        const src = this.props.host
            ? host + "/" + this.props.src
            : this.props.src;
        const index = this.props.index || 0;
        return (
            <LazyLoad once overflow={true}>
                <div
                    className="square-img"
                    style={{
                        borderRadius: this.props.round ? "5%" : "0%",
                        backgroundColor: this.props.bgc,
                    }}
                    data-index={index}
                >
                    {loading && <div className="is-loading"></div>}
                    <img
                        src={src}
                        onLoad={this.onLoad}
                        data-index={index}
                        style={
                            loading
                                ? {
                                      opacity: 0,
                                  }
                                : {
                                      opacity: 1,
                                      ...imgStyle,
                                  }
                        }
                        alt=""
                    />
                </div>
            </LazyLoad>
        );
    }
}

export default SquareImg;
