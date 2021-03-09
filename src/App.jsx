import React from "react";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import { connect } from "react-redux";
import Loadable from "react-loadable";
import routes from "@/routes/index.js";
import CompLoading from "@/components/comp-loading/comp-loading.jsx";
import ImageViewer from "@/components/image-viewer/image-viewer.jsx";
import Api from "@/api/index.js";
import "@/App.scss";
import { updatePublicKey, updateUserId } from "@/redux/actionCreater.js";

const mapState = (state) => ({});

const mapDispatch = {
    updatePublicKey,
    updateUserId,
};

class AppUI extends React.Component {
    componentDidMount() {
        Api.getPublicKey().then((res) => {
            if (res.data.code === 200) {
                const publicKey = res.data.publicKey;
                this.props.updatePublicKey(publicKey);
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
            <div className="App">
                <ImageViewer />
                <Router>
                    <CacheSwitch>
                        <Route path="/" exact>
                            <Redirect to="/home" />
                        </Route>
                        {routes.map((route) => {
                            return route.cache ? (
                                <CacheRoute
                                    exact={!!route.exact}
                                    path={route.path}
                                    key={route.path}
                                    saveScrollPosition={
                                        route.saveScrollPosition ? true : false
                                    }
                                    component={
                                        route.component
                                            ? Loadable({
                                                  loader: route.component,
                                                  loading: CompLoading,
                                              })
                                            : ""
                                    }
                                    cacheKey={route.cacheKey}
                                />
                            ) : (
                                <Route
                                    exact={!!route.exact}
                                    path={route.path}
                                    key={route.path}
                                    component={
                                        route.component
                                            ? Loadable({
                                                  loader: route.component,
                                                  loading: CompLoading,
                                              })
                                            : ""
                                    }
                                />
                            );
                        })}
                    </CacheSwitch>
                </Router>
            </div>
        );
    }
}

const AppContainer = connect(mapState, mapDispatch)(AppUI);

export default AppContainer;
