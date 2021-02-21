import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "@/App.scss";
import Home from "@/pages/home.js";
import Login from "@/pages/login/login.jsx";
import RegistPhone from "@/pages/regist-phone/regist-phone.jsx";
import RegistVerify from "@/pages/regist-verify/regist-verify.jsx";
import RegistPwd from "@/pages/regist-pwd/regist-pwd.jsx";
import TestPage from "@/pages/test-page/test-page.js";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/" component={Home} exact></Route>
                        <Route
                            path="/login"
                            component={Login}
                        ></Route>
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

export default App;
