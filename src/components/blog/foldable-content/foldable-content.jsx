import React from "react";
import classnames from "classnames";
import "./foldable-content.scss";

class FoldableContent extends React.Component {
    content = React.createRef();

    state = {
        needFoldUp: false,
        folded: false,
    };

    expand = () => {
        this.setState({
            folded: false,
        });
    };

    fold = () => {
        this.setState({
            folded: true,
        });
    };

    componentDidMount() {
        const { limitHeight } = this.props;
        const contentHeight = this.content.current.clientHeight;
        if (contentHeight > limitHeight) {
            this.setState({
                needFoldUp: true,
                folded: true,
            });
        }
    }

    render() {
        const { needFoldUp, folded } = this.state;
        const { limitHeight, style } = this.props;
        return (
            <div className="foldable-content" ref={this.content} style={style}>
                <p
                    className={classnames([folded ? "folded" : "fold"])}
                    style={{
                        height: folded ? limitHeight + "px" : "auto",
                    }}
                >
                    {this.props.children}
                </p>

                {needFoldUp ? (
                    <div className="needFoldUp">
                        {folded ? (
                            <div className="btn-folded" onClick={this.expand}>
                                全文
                            </div>
                        ) : (
                            <div className="btn-fold" onClick={this.fold}>
                                收起
                            </div>
                        )}
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default FoldableContent;
