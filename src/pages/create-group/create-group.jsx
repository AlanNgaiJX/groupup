import React from "react";
import "./create-group.scss";
import {
    NavBar,
    Icon,
    List,
    InputItem,
    Button,
    WhiteSpace,
    TextareaItem,
    Radio,
    Picker,
    ImagePicker,
} from "antd-mobile";
import modal from "@/units/modalUnit.js";
import * as Api from "@/api/index.js";
const userId = "603662756f354a14a47a7a20";

class CreateGroup extends React.Component {
    state = {
        groupNameError: false,
        groupPasswordError: false,
        groupName: "",
        groupIntro: "",
        groupType: 2,
        groupPassword: "",
        groupLocation: "不限",
        files: [],
    };

    onChangeGroupName = (value) => {
        if (value.length > 20) {
            this.setState({
                groupNameError: true,
            });
        } else {
            this.setState({
                groupNameError: false,
            });
        }
        this.setState({
            groupName: value,
        });
    };

    onChangeGroupIntro = (value) => {
        this.setState({
            groupIntro: value,
        });
    };

    onChangeGroupType = (value) => {
        this.setState({
            groupType: value,
            groupPasswordError: false,
            groupPassword: "",
        });
    };

    onChangeGroupPassword = (value) => {
        if (value.length > 4 || value.length < 4) {
            this.setState({
                groupPasswordError: true,
            });
        } else {
            this.setState({
                groupPasswordError: false,
            });
        }
        this.setState({
            groupPassword: value,
        });
    };

    onChangeGroupLocation = (value) => {
        this.setState({
            groupLocation: value[0],
        });
    };

    onFileChange = (files, type, index) => {
        this.setState({
            files,
        });
    };

    goBack = () => {
        this.props.history.goBack();
    };

    submit = () => {
        const {
            groupNameError,
            groupPasswordError,
            groupName,
            groupIntro,
            groupType,
            groupPassword,
            groupLocation,
            files,
        } = this.state;

        if (
            (groupType === 1 && groupPasswordError) ||
            groupName === "" ||
            groupNameError ||
            groupIntro === "" ||
            groupLocation === "" ||
            files.length === 0
        ) {
            modal.showToast({ title: "请检查" });
            return;
        }

        modal.showLoading({ title: "封面上传中..." });
        window.uploader.CreateFile({
            files: files.map((item) => item.file),
            salt: userId,
            onSuccess: ({ photo }) => {
                const groupCover = photo.src;
                modal.hideLoading();
                modal.showLoading({ title: "创建群组中..." });
                Api.createGroup({
                    userId,
                    groupName,
                    groupIntro,
                    groupType,
                    groupPassword,
                    groupLocation,
                    groupCover,
                }).then((res) => {
                    modal.hideLoading();
                    if (res.data.code === 200) {
                        modal.showToast({ title: "创建成功" });
                    }
                });
            },
        });
    };

    render() {
        return (
            <div id="page-create-group">
                <div className="navBarWrap">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={this.goBack}
                    >
                        创建小组
                    </NavBar>
                </div>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />

                {/* 
                 userId,
                groupName,
                groupIntro,
                groupType,
                groupPassword,
                groupLocation,
                groupCover
                */}

                {/* 群组名称 */}
                <List renderHeader={() => "群组名称，（限20字符）"}>
                    <InputItem
                        clear
                        placeholder=""
                        onChange={this.onChangeGroupName}
                        error={this.state.groupNameError}
                        value={this.state.groupName}
                    >
                        群组名称
                    </InputItem>
                </List>

                {/* 群组简介 */}
                <List renderHeader={() => "群组简介，（限100字符）"}>
                    <TextareaItem
                        rows={5}
                        count={100}
                        value={this.state.groupIntro}
                        onChange={this.onChangeGroupIntro}
                        clear
                    />
                </List>

                {/* 群组类型 */}
                <List renderHeader={() => "群组类型"}>
                    {[
                        {
                            value: 1,
                            label: "私人群组",
                        },
                        {
                            value: 2,
                            label: "公开群组",
                        },
                    ].map((i) => (
                        <Radio.RadioItem
                            key={i.value}
                            checked={this.state.groupType === i.value}
                            onChange={() => this.onChangeGroupType(i.value)}
                        >
                            {i.label}
                        </Radio.RadioItem>
                    ))}
                </List>

                {/* 私人群组有密码 */}
                {this.state.groupType === 1 ? (
                    <List renderHeader={() => "私密群组，设置4位密码"}>
                        <InputItem
                            clear
                            placeholder=""
                            type="password"
                            onChange={this.onChangeGroupPassword}
                            error={this.state.groupPasswordError}
                            value={this.state.groupPassword}
                            maxLength="4"
                            minLength="4"
                        >
                            群组密码
                        </InputItem>
                    </List>
                ) : (
                    ""
                )}

                {/* 群组位置 */}
                <List renderHeader={() => "群组位置"}>
                    <Picker
                        data={[
                            {
                                label: "不限",
                                value: "不限",
                            },
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
                        onChange={this.onChangeGroupLocation}
                        value={[this.state.groupLocation]}
                    >
                        <List.Item arrow="horizontal">位置</List.Item>
                    </Picker>
                </List>

                {/* 选择封面 */}
                <List renderHeader={() => "选择封面"}>
                    <ImagePicker
                        files={this.state.files}
                        onChange={this.onFileChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={this.state.files.length < 1}
                        multiple={false}
                    ></ImagePicker>
                    <WhiteSpace />
                </List>

                <WhiteSpace />
                <WhiteSpace />

                <div className="submit">
                    <Button type="primary" onClick={this.submit}>
                        创建
                    </Button>
                </div>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
            </div>
        );
    }
}

export default CreateGroup;
