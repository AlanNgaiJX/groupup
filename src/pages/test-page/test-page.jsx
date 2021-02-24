import React from "react";
import { Button } from "antd-mobile";
import * as Api from "@/api/index.js";
import modal from "@/units/modalUnit.js";

class TestPage extends React.Component {
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

    render() {
        return (
            <div>
                <button onClick={this.clickGetToken}>getToken</button>
                <button onClick={this.clickJwtAuth}>jwtAuth</button>
                <button onClick={this.showToast}>showToast</button>
                <button onClick={this.showLoading}>showLoading</button>
                <button onClick={this.showModal}>showModal</button>
                <Button type="primary">primary</Button>
            </div>
        );
    }
}

export default TestPage;
