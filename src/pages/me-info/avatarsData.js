import Avatar from "@/components/avatar/avatar.jsx";
const avatarsStyle = {
    display: "inline-block",
    verticalAlign: "middle",
    width: "40px",
    height: "40px",
    position: "relative",
};
export default Array.apply(null, { length: 30 }).map((item, index) => {
    return {
        label: (
            <div key={"avatar-" + index} style={{ ...avatarsStyle }}>
                <span className="avatarWrap">
                    <Avatar avatarId={index}></Avatar>
                </span>
            </div>
        ),
        value: index,
    };
});