import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "@/App.jsx";
import store from "@/redux/store.js";
import reportWebVitals from "@/reportWebVitals.js";
import "@/assets/common/css/common.css";
import "@/units/remUnit.js";
import "@/units/svgUnit.js";
import "@/units/uploadFilesUnits.js";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
