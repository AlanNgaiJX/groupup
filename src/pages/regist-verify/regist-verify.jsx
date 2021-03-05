import React from "react";
import { connect } from "react-redux";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import modal from "@/units/modalUnit.js";
import "./regist-verify.scss";

import { updateRegistForm, resetRegistForm } from "@/redux/actionCreater.js";

const mapState = (state) => ({
    registForm: state.registForm,
    count: state.count,
});

const mapDispatch = {
    updateRegistForm,
    resetRegistForm,
};

class RegistVerifyUI extends React.Component {
    state = {
        focusInput: false,
        count: 5,
        vcodeMaxLength: 6,
        timer: null,
    };

    sendVcode = () => {
        this.setState({
            count: 5,
        });
        this.startCount();
    };

    startCount = () => {
        const timer = setInterval(() => {
            const { count } = this.state;
            const newCount = count - 1;
            this.setState({
                count: newCount,
            });

            if (newCount <= 0) {
                this.clearCountTimer();
            }
        }, 1000);

        this.setState({ timer });
    };

    clearCountTimer = () => {
        const { timer } = this.state;
        clearTimeout(timer);
        this.setState({ timer: null });
    };

    handleFocusInput = () => {
        const { vcode } = this.props.registForm;
        const { vcodeMaxLength } = this.state;
        if (vcode.length === vcodeMaxLength) {
            this.props.updateRegistForm({ vcode: "" });
        }

        this.setState({
            focusInput: true,
        });
    };

    handleBlurInput = () => {
        this.setState({
            focusInput: false,
        });
    };

    handleVcodeInput = () => {
        return (e) => {
            const { vcodeMaxLength } = this.state;
            let value = e.target.value;
            if (value.length > vcodeMaxLength) {
                e.target.value = value = value.slice(0, vcodeMaxLength);
            }

            this.props.updateRegistForm({ vcode: value });

            if (value.length === vcodeMaxLength) {
                console.log("send：", value);
                this.nextStep();
            }
        };
    };

    routeBack = () => {
        this.props.resetRegistForm();
        this.props.history.goBack();
    };

    nextStep = () => {
        modal.showLoading({});
        setTimeout(() => {
            modal.hideLoading();
            this.props.history.replace("/regist-pwd");
        }, 2000);
    };

    componentDidMount() {
        this.startCount();
    }

    componentWillUnmount() {
        this.clearCountTimer();
    }

    render() {
        const { vcode } = this.props.registForm;
        const { count, vcodeMaxLength, focusInput } = this.state;

        return (
            <div id="regist-verify">
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
                            <p className="label-main">获取验证码</p>
                            <p className="label-aside">
                                验证码已经发送到您的手机
                            </p>
                            <p className="label-phone">+86 18122803695</p>
                        </div>
                        <div className="input-wrap">
                            <div className="label">
                                <div className="txt">6位数字验证码</div>
                                {count === 0 ? (
                                    <div
                                        className="resend"
                                        onClick={this.sendVcode}
                                    >
                                        重新发送
                                    </div>
                                ) : (
                                    <div className="count">
                                        验证码已发送（默认6个1） {count}s
                                    </div>
                                )}
                            </div>
                            <div className="vcode">
                                <ul className="shown">
                                    {Array.apply(null, {
                                        length: vcodeMaxLength,
                                    }).map((item, index) => {
                                        const content = vcode[index] || "";
                                        return (
                                            <li key={index}>
                                                {vcode.length === index &&
                                                focusInput ? (
                                                    <span className="focus"></span>
                                                ) : (
                                                    <span className="content">
                                                        {content}
                                                    </span>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                                <input
                                    type="tel"
                                    value={vcode}
                                    onFocus={this.handleFocusInput}
                                    onBlur={this.handleBlurInput}
                                    onChange={this.handleVcodeInput()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const RegistVerifyContainer = connect(mapState, mapDispatch)(RegistVerifyUI);

export default RegistVerifyContainer;
