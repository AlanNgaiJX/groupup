import classnames from "classnames";
import "./svg-icon.scss";

function svgIcon(props) {
    const svgStyle = (function getSvgStyle() {
        const { color, size } = props;
        const style = {};
        color && (style.color = color);
        size && (style.width = `${size}px`);
        size && (style.height = `${size}px`);
        return style;
    })()

    return (
        <i
            className={classnames([
                "svg-icon",
                `svg-icon-${props.name}`,
                props.className,
            ])}
            style={svgStyle}
        >
            <svg
                fill="currentColor"
                aria-hidden="true"
                width="100%"
                height="100%"
            >
                <use xlinkHref={`#icon-${props.name}`} />
            </svg>
        </i>
    );
}

export default svgIcon;
