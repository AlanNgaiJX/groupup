import React from "react";
import { SwipeAction } from "antd-mobile";
import moment from "@/units/momentUnit.js";
import "./message.scss";

class Messages extends React.Component {
    setReaded = () => {
        const { message, setReaded } = this.props;
        setReaded && typeof setReaded === "function" && setReaded(message._id);
    };

    delMessage = () => {
        const { message, delMessage } = this.props;
        delMessage &&
            typeof delMessage === "function" &&
            delMessage(message._id);
    };

    render() {
        const { message } = this.props;
        return (
            <div className="message">
                <SwipeAction
                    style={{ backgroundColor: "gray", borderRadius: ".2rem" }}
                    autoClose
                    right={[
                        {
                            text: "删除消息",
                            onPress: this.delMessage,
                            style: {
                                backgroundColor: "#F4333C",
                                color: "white",
                            },
                        },
                    ]}
                >
                    <div className="message-wrap" onClick={this.setReaded}>
                        <div className="content">{message.content}</div>
                        {message.status === 1 ? (
                            <div className="status"></div>
                        ) : (
                            ""
                        )}
                        <div className="time">
                            {moment(message.createdAt).fromNow()}
                        </div>
                    </div>
                </SwipeAction>
            </div>
        );
    }
}

export default Messages;
