import React from "react";
import classnames from "classnames";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import "./login.scss";

class Login extends React.Component {
    state = {
        phoneInput: "",
        pwdInput: "",
        canSubmit: false,
    };

    handlePhoneInput = () => {
        return (e) => {
            this.setState({ phoneInput: e.target.value });
        };
    };

    handlePwdInput = () => {
        return (e) => {
            this.setState({ pwdInput: e.target.value });
        };
    };

    routeToRegist = () => {
        this.props.history.push("/regist-phone");
    };

    render() {
        const { phoneInput, pwdInput, canSubmit } = this.state;

        return (
            <div id="login">
                <div className="page-header"></div>
                <div className="page-content">
                    <div className="form">
                        <div className="label-group">
                            <p className="label-main">登录</p>
                            <p className="label-aside">请输入手机号及密码</p>
                        </div>
                        <div className="input-wrap">
                            <div className="area-code">+86</div>
                            <input
                                placeholder="请输入手机号码"
                                value={phoneInput}
                                onChange={this.handlePhoneInput()}
                            />
                        </div>
                        <div className="input-wrap pwd-input-wrap">
                            <input
                                placeholder="请输入密码"
                                value={pwdInput}
                                onChange={this.handlePwdInput()}
                            />
                        </div>
                        <div
                            className={classnames([
                                "btn-submit",
                                canSubmit ? "active" : "default",
                            ])}
                        >
                            登录
                        </div>
                        <div className="to-regist" onClick={this.routeToRegist}>
                            注册账号
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
