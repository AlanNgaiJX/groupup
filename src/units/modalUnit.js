import { Toast, Modal } from "antd-mobile";

/* 
    显示toast
    {
        type: "default" | "success" | "fail" | "sorry"
        title: string
        duration: 3 (s)
        mask: true | false
    }
*/
function showToast({
    type = "default",
    title,
    duration = 1,
    mask = true,
    cb = null,
}) {
    switch (type) {
        case "default":
            Toast.info(title, duration, cb, mask);
            break;
        case "success":
            Toast.success(title, duration, cb, mask);
            break;
        case "fail":
            Toast.fail(title, duration, cb, mask);
            break;
        case "sorry":
            Toast.offline(title, duration, cb, mask);
            break;
        default:
            break;
    }
}

/* 
    显示loading
*/
function showLoading(args = { title: "loading...", mask: true }) {
    const { title, mask } = args;
    Toast.loading(title, 0, null, mask);
}

/* 
    隐藏loading
*/
function hideLoading() {
    Toast.hide();
}

function showModal({
    title,
    content,
    type = "confirm",
    success,
    confirmBtn = "确认",
    cancleBtn = "取消",
}) {
    const actions = [];
    switch (type) {
        case "confirm":
            actions.push(
                {
                    text: cancleBtn,
                    onPress: () => {
                        typeof success === "function" &&
                            success({ confirm: false });
                    },
                },
                {
                    text: confirmBtn,
                    onPress: () => {
                        typeof success === "function" &&
                            success({ confirm: true });
                    },
                }
            );
            break;
        case "alert":
            actions.push({
                text: confirmBtn,
                onPress: () => {
                    typeof success === "function" && success({ confirm: true });
                },
            });
            break;
        default:
            break;
    }
    Modal.alert(title, content, actions);
}

const modal = {
    showToast,
    showLoading,
    hideLoading,
    showModal,
};

export default modal;
