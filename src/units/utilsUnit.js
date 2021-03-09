import crypto from "crypto-browserify";
import { Buffer } from "buffer/";
import config from "@/config/index.js";

const host = config.host;

// ArrayBuffer转为字符串，参数为ArrayBuffer对象
export function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

// 字符串转为ArrayBuffer对象，参数为字符串
export function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

// 公钥加密字符串
export function publicEncrypt(publicKey, str) {
    return crypto.publicEncrypt(publicKey, Buffer.from(str)).toString("hex");
}

// 写cookies
export function setCookie(name, value, days = 30) {
    var exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie =
        name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookies
export function getCookie(name) {
    var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
}

//删除cookies
export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

// 获取图片的完整地址
export function getFullSrc(partSrc) {
    return host + "/"+partSrc;
}

// rem转px，注意使用时机（当网页加载出字体大小时）
export function remToPx(remSize) {
    var baseFontSize = parseFloat(
        document.documentElement.style.fontSize.slice(0, -2)
    );
    return remSize * baseFontSize;
}
