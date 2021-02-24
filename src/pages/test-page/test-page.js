import React from "react";
import * as Api from "@/api/index.js";

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
    render() {
        return (
            <div>
                <button onClick={this.clickGetToken}>getToken</button>
                <button onClick={this.clickJwtAuth}>jwtAuth</button>
            </div>
        );
    }
}

export default TestPage;
