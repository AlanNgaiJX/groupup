import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { publicEncrypt, getCookie } from "@/units/utilsUnit.js";
import modal from "@/units/modalUnit.js";
import Api from "@/api/index.js";
import "./login.scss";
import { updateUserId } from "@/redux/actionCreater.js";
const mapState = (state) => ({
    publicKey: state.publicKey,
});

const mapDispatch = {
    updateUserId,
};

class LoginUI extends React.Component {
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

    validPwd = (value) => {
        /* 
            必须包含字母数字，8-16位
        */
        const regs = [/^[a-zA-Z\d]{8,16}$/, /[a-zA-Z]/, /[\d]/];
        return regs.every((reg) => reg.test(value));
    };

    validPhone = (phone) => {
        return /^\d{11}$/.test(phone);
    };

    checkCanSubmit = () => {
        const { phoneInput, pwdInput } = this.state;
        return this.validPhone(phoneInput) && this.validPwd(pwdInput);
    };

    login = () => {
        if (this.checkCanSubmit) {
            const { phoneInput, pwdInput } = this.state;
            const { publicKey } = this.props;
            const encodePhone = publicEncrypt(publicKey, phoneInput);
            const encodePwd = publicEncrypt(publicKey, pwdInput);
            modal.showLoading();
            Api.loginByPwd({
                phone: encodePhone,
                password: encodePwd,
            }).then((res) => {
                modal.hideLoading();
                if (res.data.code === 200) {
                    this.props.updateUserId(getCookie("userId"));
                    this.props.history.replace("/me");
                } else {
                    modal.showToast({ title: res.data.msg });
                }
            });
        }
    };

    componentWillUnmount = () => {
        this.setState = () => {
            return;
        };
    };

    render() {
        const { phoneInput, pwdInput } = this.state;
        const canSubmit = this.checkCanSubmit();

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
                                type="tel"
                                placeholder="请输入手机号码"
                                value={phoneInput}
                                onChange={this.handlePhoneInput()}
                            />
                        </div>
                        <div className="input-wrap pwd-input-wrap">
                            <input
                                type="password"
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
                            onClick={this.login}
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

const LoginContainer = connect(mapState, mapDispatch)(LoginUI);

export default LoginContainer;
