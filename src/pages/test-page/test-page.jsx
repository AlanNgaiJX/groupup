import React from "react";
import * as Api from "@/api/index.js";
import modal from "@/units/modalUnit.js";
import { WhiteSpace } from "antd-mobile";

class TestPage extends React.Component {
    state = {
        file: [],
        fileName: "",
    };

    fileInput = React.createRef();

    clickGetToken = () => {
        Api.getToken().then((res) => {
            console.log(res);
        });
    };

    clickJwtAuth = () => {
        Api.testJwtAuth().then((res) => {
            console.log(res);
        });
    };

    showToast = () => {
        modal.showToast({ type: "sorry", title: "hello world" });
    };

    showLoading = () => {
        modal.showLoading({ title: "hello world" });
        setTimeout(() => {
            modal.hideLoading();
        }, 5000);
    };

    showModal = () => {
        modal.showModal({
            title: "alert",
            content: "this is a modal alert",
            type: "alert",
            success: (res) => {
                console.log(res.confirm);
            },
        });
    };

    fileNameChnage = (e) => {
        this.setState({ fileName: e.target.value });
    };

    fileChange = (e) => {
        this.setState({ file: e.target.files[0] });
    };

    submit = () => {
        const { file, fileName } = this.state;

        Api.uploadImg({ file, fileName }).then((res) => {
            console.log(res);
        });
    };

    select = () => {
        const clicker = document.createEvent("MouseEvents");

        clicker.initEvent("click", true, true);

        clicker.stopPropagation();

        this.fileInput.current.dispatchEvent(clicker);
    };

    selectFiles = (e) => {
        const files = e.target.files;
        this.uploadFiles(files);
        this.fileInput.current.value = null;
    };

    uploadFiles = (files) => {
        window.uploader.CreateFile({
            files,
            salt: "test_salt",
            onComputedMD5: ({ photo }) => {
                console.log("onComputedMD5:", photo);
            },
            onSuccess: ({ photo, msg }) => {
                console.log("onSuccess", photo, msg);
            },
            onProgress: ({ photo, progress }) => {
                console.log("=====", photo.md5, progress, "=====");
            },
            onAllSuccess: () => {
                console.log("全部已完成");
            },
            onGlobalSpeed: ({ speed }) => {
                console.log("<speed>：", speed);
            },
        });
    };

    render() {
        const { fileName } = this.state;
        return (
            <div>
                <button onClick={this.clickGetToken}>getToken</button>
                <button onClick={this.clickJwtAuth}>jwtAuth</button>
                <button onClick={this.showToast}>showToast</button>
                <button onClick={this.showLoading}>showLoading</button>
                <button onClick={this.showModal}>showModal</button>
                <WhiteSpace />
                <div className="form">
                    <input
                        type="text"
                        value={fileName}
                        onChange={this.fileNameChnage}
                    />
                    <input type="file" onChange={this.fileChange} />
                    <button onClick={this.submit}>提交</button>
                </div>
                <WhiteSpace />
                <div>
                    <button onClick={this.select}>选择</button>
                    <input
                        ref={this.fileInput}
                        type="file"
                        style={{ opacity: 0 }}
                        accept="image/*"
                        onChange={this.selectFiles}
                    />
                </div>
            </div>
        );
    }
}

export default TestPage;
