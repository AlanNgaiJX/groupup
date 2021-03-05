import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import "./regist-phone.scss";

import { updateRegistForm, resetRegistForm } from "@/redux/actionCreater.js";

const mapState = (state) => ({ registForm: state.registForm , count:state.count});

const mapDispatch = {
    updateRegistForm,
    resetRegistForm
};

class RegistPhoneUI extends React.Component {
    state = {
        checkboxState: false,
    };

    handlePhoneInput = () => {
        return (e) => {
            this.props.updateRegistForm({ phone: e.target.value });
        };
    };

    validPhone = (phone)=>{
        return /^\d{11}$/.test(phone);
    }

    clickCheckbox = () => {
        this.setState({
            checkboxState: !this.state.checkboxState,
        });
    };

    routeBack = () => {
        this.props.resetRegistForm();
        this.props.history.goBack();
    };

    nextStep = () => {
        this.props.history.replace("/regist-verify");
    };

    render() {
        const { phone } = this.props.registForm;
        const { checkboxState } = this.state;
        const canNextStep = checkboxState && this.validPhone(phone);

        return (
            <div id="regist-phone">
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
                            <p className="label-main">请输入您的手机号</p>
                            <p className="label-aside">
                                为了方便进行联系，请输入您的常用手机号码
                            </p>
                        </div>
                        <div className="input-wrap">
                            <div className="area-code">+86</div>
                            <input
                                placeholder="请输入手机号码"
                                value={phone}
                                type="tel"
                                onChange={this.handlePhoneInput()}
                            />
                        </div>

                        <div className="legal-checkbox">
                            <div
                                className="checkbox"
                                onClick={this.clickCheckbox}
                            >
                                {checkboxState ? (
                                    <span className="checkbox-btn active">
                                        <SvgIcon
                                            name="check"
                                            className="checkbox-btn-icon"
                                            color="#fff"
                                        ></SvgIcon>
                                    </span>
                                ) : (
                                    <span className="checkbox-btn default"></span>
                                )}
                                <span className="checkbox-label">同意</span>
                            </div>
                            <p className="legal-link">《法律条款与隐私政策》</p>
                        </div>

                        <div
                            className={classnames([
                                "btn-submit",
                                canNextStep ? "active" : "default",
                            ])}
                            onClick={this.nextStep}
                        >
                            下一步
                        </div>
                    </div>

                    {/* <div className="other-login-paths">
                        <div className="divide">
                            <span className="label">其他方式登录</span>
                        </div>
                        <ul className="paths">
                            <li className="path">
                                <SvgIcon
                                    name="wechat"
                                    className="wechat-login-icon"
                                ></SvgIcon>
                                <span className="label">微信</span>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>
        );
    }
}

const RegistPhoneContainer = connect(mapState, mapDispatch)(RegistPhoneUI);

export default RegistPhoneContainer;
