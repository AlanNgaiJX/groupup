import React from "react";
import "./square-img.scss";
const host = "http://127.0.0.1:1996/";
class SquareImg extends React.Component {
    state = {
        loading: true,
        imgStyle: {},
    };

    onLoad = (e) => {
        const { clientWidth, clientHeight } = e.target;
        const {
            clientWidth: parentWidth,
            clientHeight: parentHeight,
        } = e.target.parentNode;
        const ratio = clientWidth / clientHeight;
        const imgStyle = {};
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

        this.setState({
            loading: false,
            imgStyle,
        });
    };

    render() {
        const { loading, imgStyle } = this.state;
        const src = this.props.host
            ? host + this.props.src
            : this.props.src;
        return (
            <div className="square-img">
                {loading && <div className="is-loading"></div>}
                <img
                    src={src}
                    onLoad={this.onLoad}
                    style={
                        loading
                            ? {
                                  opacity: 0,
                              }
                            : {
                                  opacity: 1,
                                  ...imgStyle,
                                  borderRadius: this.props.round ? "10%" : "0%",
                              }
                    }
                />
            </div>
        );
    }
}

export default SquareImg;
