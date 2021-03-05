import React from "react";
import { connect } from "react-redux";
import qs from "querystring";
import * as Api from "@/api/index.js";
import NavHeader from "./nav-header/nav-header.jsx";
import GroupCard from "./group-card/group-card.jsx";
import GroupTabs from "./group-tabs/group-tabs.jsx";
import SvgIcon from "@/components/svg-icon/svg-icon.js";
import ColorThief from "colorthief/dist/color-thief.mjs";
import { getFullSrc } from "@/units/utilsUnit.js";
import "./group-detail.scss";

const mapState = (state) => ({
    userId: state.userId,
});
const mapDispatch = {};

class GroupDetailUI extends React.Component {
    state = {
        group: {
            _id: "",
            groupName: "",
            groupIntro: "",
            groupCover: "",
            groupBlogs: [],
            groupMembers: [],
            createdAt: "",
            groupPassword: "",
            groupType: "",
            groupOwner: {},
            loading: true,
        },
        bgc: "rgb(135,0,255)",
    };

    getThemeColor = (src) => {
        src = getFullSrc(src);
        const img = new Image();
        img.setAttribute("crossOrigin", "Anonymous");
        img.onload = () => {
            const rgbVal = new ColorThief()
                .getColor(img, 1000000000000000000)
                .join(",");
            this.setState({
                bgc: `rgb(${rgbVal})`,
            });
        };
        img.src = src;
    };

    toCreateBlog = () => {
        this.props.history.push(`/create-blog?groupId=${this.state.group._id}`);
    };

    componentDidMount() {
        const query = qs.parse(this.props.location.search.slice(1));
        const { groupId } = query;
        Api.getGroupDetail({
            groupId,
        }).then((res) => {
            if (res.data.code === 200) {
                const group = res.data.data;
                group.loading = false;
                this.setState({ group });
                this.getThemeColor(this.state.group.groupCover);
            } else {
            }
        });
    }

    componentWillUnmount = () => {
        this.setState = () => {
            return;
        };
    };

    render() {
        const { group, bgc } = this.state;
        return (
            <div id="group-detail">
                <NavHeader group={group} bgc={bgc}></NavHeader>
                <GroupCard group={group} bgc={bgc}></GroupCard>
                <GroupTabs
                    groupMembers={group.groupMembers}
                    groupOwner={group.groupOwner}
                    groupBlogs={group.groupBlogs}
                    loading={group.loading}
                ></GroupTabs>

                <div className="btn-publish" onClick={this.toCreateBlog}>
                    <SvgIcon
                        name="write"
                        className="btn-publish-icon"
                    ></SvgIcon>
                </div>
            </div>
        );
    }
}

const GroupDetailContainer = connect(mapState, mapDispatch)(GroupDetailUI);

export default GroupDetailContainer;
