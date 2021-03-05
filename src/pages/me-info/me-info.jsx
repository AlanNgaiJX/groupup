import React from "react";
import avatars from "./avatarsData.js";
import bgs from "./bgsData.js";
import {
    NavBar,
    Icon,
    List,
    InputItem,
    Button,
    WhiteSpace,
    Radio,
    Picker,
} from "antd-mobile";
import "./me-info.scss";
import Api from "@/api/index.js";
import modal from "@/units/modalUnit.js";

class MeInfo extends React.Component {
    state = {
        userId: "",
        nickNameError: false,
        introError: false,
        nickName: "",
        intro: "",
        gender: 0,
        city: "",
        avatarId: 0,
        bg: "rgb(135,0,255)",
    };

    onChangeNickName = (value) => {
        if (value.length > 20) {
            this.setState({
                nickNameError: true,
            });
        } else {
            this.setState({
                nickNameError: false,
            });
        }
        this.setState({
            nickName: value,
        });
    };

    onChangeIntro = (value) => {
        if (value.length > 20) {
            this.setState({
                introError: true,
            });
        } else {
            this.setState({
                introError: false,
            });
        }
        this.setState({
            intro: value,
        });
    };

    onChangeGender = (value) => {
        this.setState({
            gender: value,
        });
    };

    onChangeCity = (value) => {
        this.setState({
            city: value[0],
        });
    };

    onChangeAvatar = (value) => {
        this.setState({
            avatarId: value[0],
        });
    };

    onChangeBg = (value) => {
        this.setState({
            bg: value[0],
        });
    };

    submit = () => {
        const userId = this.state.userId;
        if (this.nickNameError || this.introError) {
            modal.showToast({ title: "请检查" });
        } else {
            const { nickName, intro, gender, city, avatarId, bg } = this.state;
            modal.showLoading();
            Api.updateUserInfo({
                userId,
                avatar: avatarId,
                background: bg,
                city,
                gender,
                intro,
                nickName,
            }).then((res) => {
                modal.hideLoading();
                if (res.data.code === 200) {
                    modal.showToast({
                        title: "已保存",
                    });
                    this.props.history.replace("/me");
                } else {
                    modal.showToast({ title: res.data.msg });
                }
            });
        }
    };

    goBack = () => {
        this.props.history.goBack();
    };

    componentDidMount() {
        const { userId } = this.props.location.state;
        this.setState({
            userId,
        });

        modal.showLoading();
        Api.getInfoByUserId({
            userId,
        }).then((res) => {
            modal.hideLoading();
            if (res.data.code === 200) {
                const {
                    avatar,
                    background,
                    city,
                    gender,
                    intro,
                    nickName,
                } = res.data.data;
                this.setState({
                    nickName,
                    intro,
                    gender,
                    city,
                    avatarId: avatar,
                    bg: background,
                });
            } else {
                modal.showToast({
                    title: res.data.msg,
                });
            }
        });
    }

    componentWillUnmount = () => {
        this.setState = () => {
            return;
        };
    };

    render() {
        return (
            <div id="me-info">
                <div className="navBarWrap">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={this.goBack}
                    >
                        个人资料
                    </NavBar>
                </div>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                {/* // 昵称 */}
                <List renderHeader={() => "用户昵称，（限20字符）"}>
                    <InputItem
                        clear
                        placeholder=""
                        onChange={this.onChangeNickName}
                        error={this.state.nickNameError}
                        value={this.state.nickName}
                    >
                        昵称
                    </InputItem>
                </List>
                <WhiteSpace />
                {/* 个性签名 */}
                <List renderHeader={() => "个性签名，（限20字符）"}>
                    <InputItem
                        clear
                        placeholder=""
                        onChange={this.onChangeIntro}
                        error={this.state.introError}
                        value={this.state.intro}
                    >
                        个性签名
                    </InputItem>
                </List>
                <WhiteSpace />
                {/* 性别 */}
                <List renderHeader={() => "性别"}>
                    {[
                        { value: 0, label: "保密" },
                        { value: 1, label: "男" },
                        { value: 2, label: "女" },
                    ].map((i) => (
                        <Radio.RadioItem
                            key={i.value}
                            checked={this.state.gender === i.value}
                            onChange={() => this.onChangeGender(i.value)}
                        >
                            {i.label}
                        </Radio.RadioItem>
                    ))}
                </List>
                <WhiteSpace />
                {/* 城市 */}
                <List renderHeader={() => "所在城市"}>
                    <Picker
                        data={[
                            {
                                label: "深圳市",
                                value: "深圳市",
                            },
                            {
                                label: "广州市",
                                value: "广州市",
                            },
                        ]}
                        cols={1}
                        onChange={this.onChangeCity}
                        value={[this.state.city]}
                    >
                        <List.Item arrow="horizontal">城市</List.Item>
                    </Picker>
                </List>
                {/* 头像 */}
                <List renderHeader={() => "头像"}>
                    <Picker
                        data={avatars}
                        value={[this.state.avatarId]}
                        cols={1}
                        onChange={this.onChangeAvatar}
                    >
                        <List.Item arrow="horizontal">头像</List.Item>
                    </Picker>
                </List>
                {/* 背景墙 */}
                <List renderHeader={() => "更换背景颜色"}>
                    <Picker
                        data={bgs}
                        value={[this.state.bg]}
                        cols={1}
                        onChange={this.onChangeBg}
                    >
                        <List.Item arrow="horizontal">背景</List.Item>
                    </Picker>
                </List>

                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <div className="submit">
                    <Button type="primary" onClick={this.submit}>
                        保存
                    </Button>
                </div>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
            </div>
        );
    }
}

export default MeInfo;
