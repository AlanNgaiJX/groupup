import React from "react";
import { Tabs } from "antd-mobile";
import { StickyContainer, Sticky } from "react-sticky";
import MeBlogs from "../me-blogs/me-blogs.jsx";
import MeMessages from "../me-messages/me-messages.jsx";

import "./me-tabs.scss";

function renderTabBar(props) {
    return (
        <Sticky>
            {({ style }) => (
                <div
                    style={{
                        ...style,
                        zIndex: 1,
                    }}
                >
                    <Tabs.DefaultTabBar {...props} />
                </div>
            )}
        </Sticky>
    );
}

class MeNav extends React.Component {
    componentDidMount() {}

    render() {
        const {
            myBlogs,
            myBlogsLoading,
            myMessages,
            myMessagesLoading,
        } = this.props;
        return (
            <div id="me-tabs">
                <StickyContainer>
                    <Tabs
                        tabs={[
                            { title: "我的足迹", sub: "t1" },
                            { title: "消息", sub: "t2" },
                        ]}
                        initialPage={0}
                        renderTabBar={renderTabBar}
                        swipeable={false}
                    >
                        {/* blogs */}
                        <div>
                            {myBlogsLoading ? (
                                ""
                            ) : (
                                <MeBlogs blogs={myBlogs}></MeBlogs>
                            )}
                        </div>
                        <div>
                            {myMessagesLoading ? (
                                ""
                            ) : (
                                <MeMessages messages={myMessages}></MeMessages>
                            )}
                        </div>
                    </Tabs>
                </StickyContainer>
            </div>
        );
    }
}

export default MeNav;
