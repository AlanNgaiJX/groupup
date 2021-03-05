import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import Home from "@/pages/home/home.jsx";
import Group from "@/pages/group/group.jsx";
import MyGroup from "@/pages/my-group/my-group.jsx";
import CreateGroup from "@/pages/create-group/create-group.jsx";
import GroupDetail from "@/pages/group-detail/group-detail.jsx";
import CreateBlog from "@/pages/create-blog/create-blog.jsx";
import Me from "@/pages/me/me.jsx";
import MeInfo from "@/pages/me-info/me-info.jsx";
import Login from "@/pages/login/login.jsx";
import RegistPhone from "@/pages/regist-phone/regist-phone.jsx";
import RegistVerify from "@/pages/regist-verify/regist-verify.jsx";
import RegistPwd from "@/pages/regist-pwd/regist-pwd.jsx";
import ImageViewer from "@/components/image-viewer/image-viewer.jsx";
import TestPage from "@/pages/test-page/test-page.jsx";
import * as Api from "@/api/index.js";
import "@/App.scss";
import { updatePublicKey } from "@/redux/actionCreater.js";

const mapState = (state) => ({});

const mapDispatch = {
    updatePublicKey,
};

class AppUI extends React.Component {
    componentDidMount() {
        Api.getPublicKey().then((res) => {
            if (res.data.code === 200) {
                const publicKey = res.data.publicKey;
                this.props.updatePublicKey(publicKey);
            }
        });
    }

    componentWillUnmount = () => {
        this.setState = () => {
            return;
        };
    };

    render() {
        return (
            <div className="App">
                <ImageViewer />
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/home" />
                        </Route>
                        <Route path="/home" component={Home}></Route>
                        <Route path="/group" component={Group} exact></Route>
                        <Route
                            path="/group/my-group"
                            component={MyGroup}
                            exact
                        ></Route>
                        <Route
                            path="/group/create-group"
                            component={CreateGroup}
                            exact
                        ></Route>
                        <Route
                            path="/group-detail"
                            component={GroupDetail}
                            exact
                        ></Route>
                        <Route
                            path="/create-blog"
                            component={CreateBlog}
                            exact
                        ></Route>
                        <Route path="/me" exact component={Me}></Route>
                        <Route path="/me/info" exact component={MeInfo}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route
                            path="/regist-phone"
                            component={RegistPhone}
                        ></Route>
                        <Route
                            path="/regist-verify"
                            component={RegistVerify}
                        ></Route>
                        <Route path="/regist-pwd" component={RegistPwd}></Route>
                        <Route path="/test-page" component={TestPage}></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

const AppContainer = connect(mapState, mapDispatch)(AppUI);

export default AppContainer;
