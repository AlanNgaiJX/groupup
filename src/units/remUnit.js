const resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";

function recalc() {
    var clientWidth = document.documentElement.clientWidth;
    if (!clientWidth) return;
    var theoryFontSize = 100 * (clientWidth / 750);
    document.documentElement.style.fontSize = theoryFontSize + "px";
};

window.addEventListener(resizeEvt, recalc, false);
document.addEventListener("DOMContentLoaded", recalc(), false);
