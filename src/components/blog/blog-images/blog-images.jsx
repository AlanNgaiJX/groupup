import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import {
    updateImageViewerOn,
    updateImageViewerList,
} from "@/redux/actionCreater";
import SquareImg from "@/components/square-img/square-img.jsx";
import "./blog-images.scss";

const mapState = (state) => ({
    imageViewerOn: state.imageViewerOn,
    imageViewerList: state.imageViewerList,
});

const mapDispatch = {
    updateImageViewerOn,
    updateImageViewerList,
};

class BlogImagesUI extends React.Component {
    clickListOfImages = (e) => {
        const index = e.target.getAttribute('data-index') * 1;
        const { blogImages } = this.props;
        blogImages[index].active = true;
        this.props.updateImageViewerList(blogImages);
        this.props.updateImageViewerOn(true);
    };
    render() {
        const { blogImages } = this.props;
        return (
            <div
                className={classnames([
                    "blogImages",
                    "format" + blogImages.length,
                ])}
                onClick={this.clickListOfImages}
            >
                {blogImages.map((image,index) => {
                    return (
                        <div className="imageWrap" key={image.md5}>
                            <SquareImg
                                src={image.src}
                                host
                                full={blogImages.length === 1}
                                index={index}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

const BlogImagesContainer = connect(mapState, mapDispatch)(BlogImagesUI);

export default BlogImagesContainer;
