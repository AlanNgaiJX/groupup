import React from "react";
import { connect } from "react-redux";
import qs from "querystring";
import "./create-blog.scss";
import {
    NavBar,
    Icon,
    List,
    Button,
    WhiteSpace,
    TextareaItem,
    ImagePicker,
} from "antd-mobile";
import modal from "@/units/modalUnit.js";
import Api from "@/api/index.js";

const mapState = (state) => ({
    userId: state.userId,
});
const mapDispatch = {};

class CreateBlogUI extends React.Component {
    state = {
        groupId: "",
        blogContent: "",
        files: [],
    };

    onChangeBlogContent = (value) => {
        this.setState({
            blogContent: value,
        });
    };

    onFileChange = (files, type, index) => {
        this.setState({
            files,
        });
    };

    goBack = () => {
        this.props.history.goBack();
    };

    submit = () => {
        const { userId } = this.props;
        const { groupId, files, blogContent } = this.state;

        if (blogContent === "") {
            modal.showToast({ title: "请检查" });
            return;
        }

        if (files.length) {
            modal.showLoading({ title: "图片上传中..." });
            const blogImages = [];
            window.uploader.CreateFile({
                files: files.map((item) => item.file),
                salt: userId,
                onSuccess: ({ photo }) => {
                    modal.hideLoading();
                    blogImages.push(photo.id);
                    if (blogImages.length === files.length) {
                        fetch(groupId, userId, blogContent, blogImages);
                    }
                },
                onError: () => {
                    modal.hideLoading();
                    modal.showToast({ title: "上传出错，请重试" });
                },
            });
        }

        const fetch = (groupId, userId, blogContent, blogImages) => {
            modal.showLoading({ title: "正在发布..." });
            Api.createBlog({ groupId, userId, blogContent, blogImages }).then(
                (res) => {
                    modal.hideLoading();
                    if (res.data.code === 200) {
                        this.goBack();
                    } else {
                        modal.showToast({ title: res.data.msg });
                    }
                }
            );
        };
    };

    componentDidMount() {
        this.setState({
            groupId: qs.parse(this.props.location.search.slice(1)).groupId,
        });
    }

    componentWillUnmount = () => {
        this.setState = () => {
            return;
        };
    };

    render() {
        return (
            <div id="page-create-blog">
                <div className="navBarWrap">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={this.goBack}
                    >
                        发表
                    </NavBar>
                </div>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                {/* 内容 */}
                <List renderHeader={() => "内容"}>
                    <TextareaItem
                        rows={5}
                        count={200}
                        value={this.state.blogContent}
                        onChange={this.onChangeBlogContent}
                        clear
                    />
                </List>
                {/* 选择图片 */}
                <List renderHeader={() => "选择图片"}>
                    <ImagePicker
                        files={this.state.files}
                        onChange={this.onFileChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={this.state.files.length < 4}
                        multiple={true}
                        accept="image/*"
                        length="2"
                    ></ImagePicker>
                    <WhiteSpace />
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <div className="submit">
                    <Button type="primary" onClick={this.submit}>
                        发表
                    </Button>
                </div>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
            </div>
        );
    }
}

const CreateBlogContainer = connect(mapState, mapDispatch)(CreateBlogUI);

export default CreateBlogContainer;
