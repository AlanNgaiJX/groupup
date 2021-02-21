import React from "react";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import "./regist-verify.scss";

class RegistVerify extends React.Component {
    state = {
        vcodeInput: "",
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
        const { vcodeInput, vcodeMaxLength } = this.state;
        if (vcodeInput.length === vcodeMaxLength) {
            this.setState({
                vcodeInput: "",
            });
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
            this.setState({
                vcodeInput: value,
            });

            if (value.length === vcodeMaxLength) {
                console.log("send：", value);
                this.nextStep();
            }
        };
    };

    routeBack = () => {
        this.props.history.goBack();
    };

    nextStep = () => {
        this.props.history.replace("/regist-pwd");
    };

    componentDidMount() {
        this.startCount();
    }

    componentWillUnmount() {
        this.clearCountTimer();
    }

    render() {
        const { count, vcodeMaxLength, vcodeInput, focusInput } = this.state;
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
                                    <div className="count">{count}s</div>
                                )}
                            </div>
                            <div className="vcode">
                                <ul className="shown">
                                    {Array.apply(null, {
                                        length: vcodeMaxLength,
                                    }).map((item, index) => {
                                        const content = vcodeInput[index] || "";
                                        return (
                                            <li key={index}>
                                                {vcodeInput.length === index &&
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
                                    type="number"
                                    value={vcodeInput}
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

export default RegistVerify;
