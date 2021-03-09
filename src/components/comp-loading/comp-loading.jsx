import React from "react";
import Skeleton from "@/components/skeleton/skeleton.jsx";
import "./comp-loading.scss";

class CompLoading extends React.Component {
    render() {
        return (
            <div className="comp-loading-wrap">
                <Skeleton />
            </div>
        );
    }
}

export default CompLoading;
