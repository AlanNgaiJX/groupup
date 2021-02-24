import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import fastclick from "fastclick";
import App from "@/App.jsx";
import store from "@/redux/store.js";
import reportWebVitals from "@/reportWebVitals.js";
import "@/assets/common/css/common.css";
import "@/units/remUnit.js";
import "@/units/svgUnit.js";

// fastclick.call(window,document.body);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
