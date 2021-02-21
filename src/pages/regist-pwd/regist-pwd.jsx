import React from "react";
import classnames from "classnames";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import "./regist-pwd.scss";

class RegistPwd extends React.Component {
    state = {
        canSubmit: false,
        pwdInput: "",
        pwdMaxLength: 16,
    };

    handlePwdInput = () => {
        return (e) => {
            const { pwdMaxLength } = this.state;
            let value = e.target.value;

            if (value.length > pwdMaxLength) {
                e.target.value = value = value.slice(0, pwdMaxLength);
            }
            console.log(value);
            this.setState({
                pwdInput: value,
                canSubmit: this.validPwd(value),
            });
        };
    };

    validPwd = (value) => {
        /* 
            必须包含字母数字，8-16位
        */
        const regs = [/^[a-zA-Z\d]{8,16}$/, /[a-zA-Z]/, /[\d]/];
        return regs.every((reg) => reg.test(value));
    };
    
    routeBack = () => {
        this.props.history.goBack();
    };

    render() {
        const { pwdInput, canSubmit } = this.state;
        return (
            <div id="regist-pwd">
                <div className="page-header">
                    <div className="btn-back" onClick={this.routeBack}>
                        <SvgIcon
                            name="back"
                            className="btn-back-icon"
                        ></SvgIcon>
                    </div>
                </div>
                <div className="page-content">
                    <div className="form">
                        <div className="label-group">
                            <p className="label-main">设置登录密码</p>
                            <p className="label-aside">设置用于登录App的密码</p>
                        </div>

                        <div className="input-wrap">
                            <input
                                type="password"
                                placeholder="8-16位密码"
                                value={pwdInput}
                                onChange={this.handlePwdInput()}
                            />
                            <div className="input-labels">
                                <p className="label-item">
                                    须包含数字、字母2种元素
                                </p>
                                <p className="label-item">密码长度需8-16位</p>
                            </div>
                        </div>

                        <div
                            className={classnames([
                                "btn-submit",
                                canSubmit ? "active" : "default",
                            ])}
                        >
                            确认
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegistPwd;
