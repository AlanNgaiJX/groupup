import crypto from "crypto-browserify";
import { Buffer } from "buffer/";

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
