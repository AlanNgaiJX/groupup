const bgsStyle = {
    display: "inline-block",
    verticalAlign: "middle",
    width: "20px",
    height: "20px",
    position: "relative",
};
const bgs = [
    "rgb(135,0,255)",
    "rgb(135,139,255)",
    "rgb(203,30,66)",
    "rgb(255,240,240)",
    "rgb(255,203,0)",
    "rgb(236,203,175)",
    "rgb(236,203,212)",
];

export default bgs.map((item, index) => {
    return {
        label: (
            <div
                key={"bg-" + index}
                style={{ ...bgsStyle, backgroundColor: item }}
            >
                <span className="bgWrap"></span>
            </div>
        ),
        value: item,
    };
});
