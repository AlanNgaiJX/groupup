import React from "react";
import { Carousel, Icon } from "antd-mobile";
import SquareImg from "@/components/square-img/square-img.jsx";
import "./viewer-inner.scss";

class ViewerInner extends React.Component {
    state = {
        imgHeight: "176px",
    };

    viewerInner = React.createRef();

    ontouchmove = (e) => {
        e.preventDefault();
    };

    componentDidMount() {
        this.viewerInner.current.addEventListener(
            "touchmove",
            this.ontouchmove
        );
    }

    componentWillUnmount() {
        this.viewerInner.current.removeEventListener(
            "touchmove",
            this.ontouchmove
        );
    }

    render() {
        const { imageViewerList } = this.props;
        return (
            <div className="image-viewer-inner" ref={this.viewerInner}>
                <div
                    className="btn-close"
                    onClick={this.props.closeImageViewer}
                >
                    <Icon type="cross" size="lg" color="#fff" />
                </div>
                <div className="imgs-wrap">
                    <Carousel
                        autoplay={false}
                        infinite={false}
                        selectedIndex={imageViewerList.findIndex(
                            (item) => item.active
                        )}
                    >
                        {imageViewerList.map((item) => {
                            return (
                                <div
                                    key={item._id}
                                    style={{
                                        display: "inline-block",
                                        width: "100%",
                                        height: this.state.imgHeight,
                                    }}
                                >
                                    <SquareImg
                                        key={item._id}
                                        src={item.src}
                                        full
                                        host
                                        bgc="transparent"
                                        onLoad={() => {
                                            window.dispatchEvent(
                                                new Event("resize")
                                            );
                                            this.setState({
                                                imgHeight: "auto",
                                            });
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default ViewerInner;
