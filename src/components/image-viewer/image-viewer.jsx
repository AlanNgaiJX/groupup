import React from "react";
import { connect } from "react-redux";
import ViewerInner from "./viewer-inner/viewer-inner.jsx";
import {
    updateImageViewerOn,
    updateImageViewerList,
} from "@/redux/actionCreater";
import "./image-viewer.scss";

const mapState = (state) => ({
    imageViewerOn: state.imageViewerOn,
    imageViewerList: state.imageViewerList,
});

const mapDispatch = {
    updateImageViewerOn,
    updateImageViewerList,
};

class ImageViewerUI extends React.Component {
    imageViewer = React.createRef();
    imgWrap = React.createRef();

    closeImageViewer = () => {
        this.props.updateImageViewerOn(false);
    };

    touchMoveCb = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    componentDidMount() {
        // this.imageViewer.current.addEventListener(
        //     "touchmove",
        //     this.touchMoveCb
        // );
    }

    render() {
        const { imageViewerOn, imageViewerList } = this.props;
        return (
            <div id="image-viewer" ref={this.imageViewer}>
                {imageViewerOn ? (
                    <ViewerInner
                        closeImageViewer={this.closeImageViewer}
                        imageViewerList={imageViewerList}
                    />
                ) : (
                    ""
                )}
            </div>
        );
    }
}

const ImageViewerContainer = connect(mapState, mapDispatch)(ImageViewerUI);

export default ImageViewerContainer;
