import React from "react";
import MeCard from "./me-card/me-card.jsx";
import MeTabs from "./me-tabs/me-tabs.jsx";
import NavFooter from "@/components/nav-footer/nav-footer.jsx";

class Me extends React.Component {
    render() {
        return (
            <div id="page-me">
                <MeCard></MeCard>
                <MeTabs></MeTabs>
                <NavFooter
                    path={this.props.history.location.pathname}
                ></NavFooter>
            </div>
        );
    }
}

export default Me;
