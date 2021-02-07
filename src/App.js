import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "@/App.scss";
import Home from "@/pages/home.js";
import RegistPhone from "@/pages/regist-phone/regist-phone.js";
import RegistVerify from "@/pages/regist-verify/regist-verify.js";
import RegistPwd from "@/pages/regist-pwd/regist-pwd.js";
import TestPage from "@/pages/test-page/test-page.js";
// import TestCom from "@/components/test-com/test-com.js";
function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" component={Home} exact></Route>
                    <Route path="/regist-phone" component={RegistPhone}></Route>
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

export default App;
