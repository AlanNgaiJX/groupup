import React from "react";
import NavFooter from "@/components/nav-footer/nav-footer.jsx";

class Home extends React.Component {
    render() {
        return (
            <div>
                Home
                <NavFooter
                    path={this.props.history.location.pathname}
                ></NavFooter>
            </div>
        );
    }
}

export default Home;
