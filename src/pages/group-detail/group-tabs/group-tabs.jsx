import React from "react";
import { Tabs } from "antd-mobile";
import { StickyContainer, Sticky } from "react-sticky";
import { remToPx } from "@/units/utilsUnit.js";
import GroupMembers from "../group-members/group-members.jsx";
import GroupBlogs from "../group-blogs/group-blogs.jsx";
import "./group-tabs.scss";

function renderTabBar(props) {
    return (
        <Sticky topOffset={remToPx(-1)}>
            {({ style, isSticky }) => (
                <div
                    style={{
                        ...style,
                        zIndex: 1,
                        marginTop: isSticky ? remToPx(1) + "px" : "0px",
                    }}
                >
                    <Tabs.DefaultTabBar {...props} />
                </div>
            )}
        </Sticky>
    );
}

class GroupTabs extends React.Component {
    render() {
        const { groupMembers, groupOwner, groupBlogs, loading } = this.props;
        return (
            <div id="group-tabs">
                <StickyContainer>
                    <Tabs
                        tabs={[
                            { title: "动态", sub: "t1" },
                            { title: "成员", sub: "t2" },
                        ]}
                        initialPage={0}
                        renderTabBar={renderTabBar}
                        swipeable={false}
                    >
                        {/* 动态 */}
                        <div>
                            {loading ? (
                                ""
                            ) : (
                                <GroupBlogs
                                    groupBlogs={groupBlogs}
                                ></GroupBlogs>
                            )}
                        </div>

                        {/* 群成员 */}
                        <div>
                            {loading ? (
                                ""
                            ) : (
                                <GroupMembers
                                    groupMembers={groupMembers}
                                    groupOwner={groupOwner}
                                ></GroupMembers>
                            )}
                        </div>
                    </Tabs>
                </StickyContainer>
            </div>
        );
    }
}

export default GroupTabs;
