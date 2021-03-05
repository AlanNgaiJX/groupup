import React, { Fragment } from "react";
import Message from "./message/message.jsx";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import * as Api from "@/api/index.js";
import "./me-messages.scss";

class MeMessages extends React.Component {
    state = {
        messages: [],
    };

    setReaded = (messageId) => {
        const { messages } = this.state;
        Api.setMessageReaded({
            messageId,
        }).then((res) => {
            if (res.data.code === 200) {
                const target = messages.find((item) => item._id === messageId);
                target && (target.status = 2);
                this.setState({
                    messages,
                });
            }
        });
    };

    delMessage = (messageId) => {
        const { messages } = this.state;
        Api.delMessage({
            messageId,
        }).then((res) => {
            if (res.data.code === 200) {
                this.setState({
                    messages: messages.filter((item) => item._id !== messageId),
                });
            }
        });
    };

    componentDidMount() {
        const { messages } = this.props;
        this.setState({
            messages,
        });
    }

    render() {
        const { messages } = this.state;
        return (
            <ul className="me-messages">
                {messages.length ? (
                    messages.map((item, index) => {
                        return (
                            <Fragment key={item._id}>
                                <Message
                                    setReaded={this.setReaded}
                                    delMessage={this.delMessage}
                                    message={item}
                                ></Message>
                                {index === messages.length - 1 ? (
                                    <li className="nomore">
                                        <SvgIcon
                                            name="nomore"
                                            className="nomore-icon"
                                        ></SvgIcon>
                                        已无更多
                                    </li>
                                ) : (
                                    ""
                                )}
                            </Fragment>
                        );
                    })
                ) : (
                    <li className="empty">
                        <SvgIcon name="empty" className="empty-icon"></SvgIcon>
                        空空如也
                    </li>
                )}
            </ul>
        );
    }
}

export default MeMessages;
