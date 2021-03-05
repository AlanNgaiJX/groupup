import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import { publicEncrypt } from "@/units/utilsUnit.js";
import * as Api from "@/api/index.js";
import "./regist-pwd.scss";
import modal from "@/units/modalUnit.js";

import { updateRegistForm, resetRegistForm } from "@/redux/actionCreater.js";

const mapState = (state) => ({
    registForm: state.registForm,
    count: state.count,
    publicKey: state.publicKey,
});

const mapDispatch = {
    updateRegistForm,
    resetRegistForm,
};

class RegistPwdUI extends React.Component {
    state = {
        pwdMaxLength: 16,
    };

    handlePwdInput = () => {
        return (e) => {
            const { pwdMaxLength } = this.state;
            let value = e.target.value;

            if (value.length > pwdMaxLength) {
                e.target.value = value = value.slice(0, pwdMaxLength);
            }

            this.props.updateRegistForm({
                password: value,
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

    validPhone = (phone) => {
        return /^\d{11}$/.test(phone);
    };

    routeBack = () => {
        this.props.resetRegistForm();
        this.props.history.goBack();
    };

    submit = () => {
        /* 验证表单，请求注册 */
        if (this.checkCanSubmit()) {
            const { phone, password } = this.props.registForm;
            const publicKey = this.props.publicKey;
            const encodePhone = publicEncrypt(publicKey, phone);
            const encodePwd = publicEncrypt(publicKey, password);
            modal.showLoading();
            Api.postRegist({
                phone: encodePhone,
                password: encodePwd,
                vcode: "1111",
            }).then((res) => {
                modal.hideLoading();
                if (res.data.code === 200) {
                    modal.showToast({ type: "success", title: "注册成功" });
                    this.props.history.push("/login");
                } else if (res.data.code === 99) {
                    modal.showModal({
                        type: "alert",
                        title: "注册失败，账号已存在",
                        success: () => {
                            this.props.history.goBack();
                        },
                    });
                } else {
                    modal.showModal({
                        type: "alert",
                        title: res.data.msg,
                        success: () => {
                            this.props.history.goBack();
                        },
                    });
                }
            });
        }
    };

    checkCanSubmit = () => {
        const { password, phone } = this.props.registForm;
        return this.validPhone(phone) && this.validPwd(password);
    };

    componentDidMount() {
        if (this.props.registForm.phone === "") {
            this.props.history.replace("/regist-phone");
        }
    }

    componentWillUnmount = () => {
        this.setState = () => {
            return;
        };
    };

    render() {
        const { password } = this.props.registForm;
        const canSubmit = this.checkCanSubmit();
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
                                value={password}
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
                            onClick={this.submit}
                        >
                            确认
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const RegistPwdContainer = connect(mapState, mapDispatch)(RegistPwdUI);

export default RegistPwdContainer;
