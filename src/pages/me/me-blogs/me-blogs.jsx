import React, { Fragment } from "react";
import Blog from "@/components/blog/blog.jsx";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import "./me-blogs.scss";

class MeBlogs extends React.Component {
    render() {
        const { blogs } = this.props;
        return (
            <ul className="me-blogs">
                {blogs.length ? (
                    blogs.map((item, index) => {
                        return (
                            <Fragment key={item._id}>
                                <Blog blog={item}></Blog>
                                {index === blogs.length - 1 ? (
                                    <li className="nomore">
                                        <SvgIcon
                                            name="nomore"
                                            className="nomore-icon"
                                        ></SvgIcon>
                                        已无更多
                                    </li>
                                ) : (
                                    ""
                                )}
                            </Fragment>
                        );
                    })
                ) : (
                    <li className="empty">
                        <SvgIcon name="empty" className="empty-icon"></SvgIcon>
                        空空如也，去发布您的动态吧
                    </li>
                )}
            </ul>
        );
    }
}

export default MeBlogs;
