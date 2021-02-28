import React from "react";
import { Tabs, WhiteSpace } from "antd-mobile";
import { StickyContainer, Sticky } from "react-sticky";
import "./me-tabs.scss";

function renderTabBar(props) {
    return (
        <Sticky>
            {({ style }) => (
                <div style={{ ...style, zIndex: 1 }}>
                    <Tabs.DefaultTabBar {...props} />
                </div>
            )}
        </Sticky>
    );
}

const tabs = [
    { title: "我的足迹", key: "t1" },
    { title: "消息", key: "t2" },
];

class MeNav extends React.Component {
    render() {
        return (
            <div id="me-tabs">
                <StickyContainer>
                    <Tabs
                        tabs={tabs}
                        initialPage={"t1"}
                        renderTabBar={renderTabBar}
                    ></Tabs>

                    {Array.apply(null, { length: 100 }).map((item, index) => (
                        <WhiteSpace key={index} />
                    ))}
                </StickyContainer>
            </div>
        );
    }
}

export default MeNav;
