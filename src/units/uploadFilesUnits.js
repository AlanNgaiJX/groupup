import crypto from "crypto-browserify";
import config from "@/config/index";
const host = config.host;
const uploader = {};
const EXIF = window.EXIF;
uploader.uploadUrl = host + "/photo/uploadPhoto";
uploader.checkUrl = host + "/photo/getPhotoByMd5";
uploader.userId = "6034d4e40bbc981be298f6f4";

uploader.partSize = 1024 * 1024 * 4; //片段大小
uploader.concurrencyCount = 2; //并发数
uploader.queue = []; //待上传队列
uploader.uploadingXHRs = []; //上传中的队列
uploader.processXHRs = []; //处理中的队列
uploader.errorXHRs = []; //出错的队列
uploader.speed = 0; //上传速度
uploader.speedBuffer = 0; //上传速度的贤内助
uploader.speedTimer = null; //上传速度定时器
uploader.checkTimer = null; //上传速度监测定时器
uploader.uploading = false; //是否正在上传
uploader.isAutoRotateBrowser = false; //浏览器是否会自动修正旋转（属怪异动作，需要特殊兼容）

// 预检测浏览器（检测浏览器是否自动旋转图片）
detectBrowser().then((isAutoRotateBrowser) => {
    uploader.isAutoRotateBrowser = isAutoRotateBrowser;
});

/* <- uploader.CreateFile start */
uploader.CreateFile = function (args) {
    const files = args.files, //要创建的文件数组
        salt = args.salt; //加盐,userId
    uploader.onSuccess = args.onSuccess; //单个照片成功事件
    uploader.onError = args.onError; //单个照片错误事件
    uploader.onAllSuccess = args.onAllSuccess; //全部完成事件
    uploader.onProgress = args.onProgress; //进度事件
    uploader.onGlobalSpeed = args.onGlobalSpeed; //全局速度事件
    uploader.onComputedMD5 = args.onComputedMD5; //计算md5完成
    uploader.userId = args.userId;
    uploader.uploading = true;

    let i = 0;

    const judge = () => {
        if (i < files.length) {
            onloadFile();
        } else {
            //检查上传列表
            checkQueueList();
        }
    };

    // 加载文件
    const onloadFile = () => {
        const file = files[i];
        file.slice = file.slice || file.webkitSlice;

        //读取文件的三个片段不然读取整个文件太耗时
        const filePart1 = file.slice(0, 100),
            filePart2 = file.slice(file.size / 2 - 50, file.size / 2 + 50),
            filePart3 = file.slice(file.size - 100, file.size);

        const blob = new Blob([filePart1, filePart2, filePart3]);

        const fr = new FileReader();
        fr.onload = (e) => {
            //计算md5
            const md5 = matchingMD5(fr.result, file, salt);

            //获取本地照片路径
            const src = window.URL
                ? window.URL.createObjectURL(file)
                : fr.result;

            //获取照片信息
            EXIF.getData(file, function () {
                const orientation = EXIF.getTag(this, "Orientation");
                let shootTime =
                    EXIF.getTag(this, "DateTime") ||
                    EXIF.getTag(this, "DateTimeOriginal") ||
                    EXIF.getTag(this, "DateTimeDigitized");
                try {
                    //有拍摄时间的检查格式
                    if (shootTime) {
                        shootTime = checkDate(shootTime);
                    }
                } catch (error) {
                    // 拍摄时间格式存在问题
                    console.warn("uploadFiles：拍摄时间格式存在问题");
                    shootTime = undefined;
                }

                const img = new Image();
                img.onload = () => {
                    let imgSrc = src,
                        imgWidth = img.width,
                        imgHeight = img.height;

                    //阿里云限制 原图单边大小不能超过30000px 原图总像素不能超过2.5亿px
                    if (
                        imgWidth > 30000 ||
                        imgHeight > 30000 ||
                        imgWidth * imgHeight > 250000000
                    ) {
                        alert(
                            `照片尺寸过大，请将单边尺寸控制在15000像素内\n文件名：${file.name}`
                        );
                    } else {
                        // 兼容浏览器自动旋转图片
                        if (orientation && uploader.isAutoRotateBrowser) {
                            // 原图尺寸的canvas
                            let canvas = FixRotate(img, orientation);

                            // 纠正图片宽高信息
                            imgWidth = canvas.width;
                            imgHeight = canvas.height;
                            canvas = null;

                            let ext = file.name.split(".")[
                                file.name.split(".").length - 1
                            ];
                            ext = ext === "jpg" ? "jpeg" : ext;

                            // 小尺寸canvas，太大移动端生成不了base64
                            let canvas_small = FixRotate(
                                img,
                                orientation,
                                1200
                            );

                            // 'image/jpg' 是无效的 jpeg才有效
                            const imgBase64 = canvas_small.toDataURL(
                                "image/" + ext,
                                0.8
                            );
                            canvas_small = null;

                            const imgBlob = dataURItoBlob(imgBase64);

                            // 纠正外界展示的图片
                            imgSrc = window.URL.createObjectURL(imgBlob);
                        }

                        const photo = {
                            file: file,
                            src: imgSrc,
                            md5: md5,
                            orientation: orientation || 0,
                            shootTime: shootTime,
                            width: imgWidth,
                            height: imgHeight,
                            uploadProgress: "wait",
                            xhr: null,
                        };

                        //插入待上传列表
                        uploader.queue.push(photo);

                        onComputedMd5(photo);
                    }

                    i++;
                    judge();
                };
                img.onerror = (err) => {
                    i++;
                    judge();
                };
                img.src = src;
            });
        };
        fr.readAsDataURL(blob);
    };

    judge();

    //计算速度
    if (!uploader.speedTimer) {
        uploader.speedTimer = setInterval(function () {
            //全部上传完就清空计算速度的
            if (!uploader.uploading) {
                clearInterval(uploader.speedTimer);
                uploader.speedTimer = null;
            }

            uploader.speed = uploader.speedBuffer;
            uploader.speedBuffer = 0;

            if (typeof uploader.onGlobalSpeed === "function") {
                uploader.onGlobalSpeed({
                    speed: uploader.speed,
                });
            }
        }, 1000);
    }
};
/* uploader.CreateFile end -> */

//检查上传队列
function checkQueueList() {
    if (
        uploader.queue.length !== 0 &&
        uploader.uploadingXHRs.length < uploader.concurrencyCount
    ) {
        //移到上传中队列
        const photo = uploader.queue.shift();
        uploader.uploadingXHRs.push(photo);
        checkPhoto(photo);

        //并行
        checkQueueList();
    } else if (
        uploader.queue.length === 0 &&
        uploader.uploadingXHRs.length === 0 &&
        uploader.errorXHRs.length === 0
    ) {
        uploader.uploading = false;
        //全部完成回调
        onUploadAllSuccess();
    }
}

//检查照片是否已上传过，否则继续上传
function checkPhoto(photo) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", uploader.checkUrl, true);

    xhr.onload = (e) => {
        const res = JSON.parse(e.target.response);
        if (res.code === 200) {
            if (res.data) {
                //已存在
                const uploadedPhoto = res.data;
                //移出上传文件列表
                removeXHRsList(uploader.uploadingXHRs, uploadedPhoto);

                //检测待上传列表
                checkQueueList();

                //成功回调
                onUploadSuccess(uploadedPhoto, "照片已存在");
            } else {
                //不存在
                checkToken(() => uploadPhoto(photo));
            }
        } else {
            alert(res.msg);
        }
    };

    xhr.onerror = (e) => {
        //网络问题才会进来这里
        onUploadError(photo, e);
    };

    const formData = new FormData();
    formData.append("md5", photo.md5);
    formData.append("userId", uploader.userId);

    xhr.send(formData);
    photo.xhr = xhr;
}

//检查获取token update标记说明需要更新
function checkToken(callback, update) {
    callback();
}

//照片上传
function uploadPhoto(photo) {
    let total = 0;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", uploader.uploadUrl, true);

    //上传完执行
    xhr.onload = function (e) {
        if (e.target.readyState === 4 && e.target.status === 200) {
            const data = JSON.parse(e.target.responseText);
            if (data.code === 200) {
                //上传成功
                const uploadedPhoto = data.data.photo;
                uploadedPhoto.uploadProgress = "success";
                //移出上传文件列表
                removeXHRsList(uploader.uploadingXHRs, uploadedPhoto);

                //检测上传列表
                checkQueueList();

                //成功回调
                onUploadSuccess(uploadedPhoto, "处理成功");
            } else {
                onUploadError(photo, e);
                alert("上传失败");
            }
        } else {
            onUploadError(photo, e);
            alert("上传失败");
        }
    };

    //上传过程中执行
    xhr.upload.onprogress = function (e) {
        var progress = e.loaded / e.total;

        uploader.speedBuffer += e.loaded - total;
        total = e.loaded;

        //变更进度
        onUploadProgress(photo, progress);
    };

    xhr.onerror = function (e) {
        //网络问题才会进来这里
        onUploadError(photo, e);
    };

    //获取照片上传路径
    var uploadPath = getUploadPath(photo);

    const orientation = photo.orientation ? photo.orientation : "",
        shootTime = photo.shootTime ? photo.shootTime : "";

    const formData = new FormData();
    console.warn(photo.md5);
    formData.append("src", uploadPath);
    formData.append("userId", uploader.userId);
    formData.append("md5", photo.md5);
    formData.append("width", photo.width);
    formData.append("height", photo.height);
    formData.append(
        "exif",
        `orientation:${orientation || 0};shootTime:${shootTime};`
    );
    formData.append("file", photo.file);

    xhr.send(formData);
    photo.xhr = xhr;
    photo.path = uploadPath;
}

//移出列表
function removeXHRsList(list, photo) {
    for (var i = 0; i < list.length; i++) {
        var md5 = list[i].md5;
        if (md5 === photo.md5) {
            list.splice(i, 1);
        }
    }
}

/* 回调钩子 */
// 照片已被加载
function onComputedMd5(photo) {
    if (typeof uploader.onComputedMD5 === "function") {
        uploader.onComputedMD5({
            photo: photo,
        });
    }
}

// 上传进度回调
function onUploadProgress(photo, progress) {
    if (typeof uploader.onProgress == "function") {
        uploader.onProgress({
            photo: photo,
            progress: progress,
        });
    }
}

// 上传成功回调
function onUploadSuccess(photo, msg) {
    photo.xhr = null;

    onUploadProgress(photo, "success");

    if (typeof uploader.onSuccess == "function") {
        //还剩余多少个未上传
        var existCount =
            uploader.queue.length +
            uploader.uploadingXHRs.length +
            uploader.errorXHRs.length +
            uploader.processXHRs.length;
        uploader.onSuccess({
            photo: photo,
            msg: msg,
            existCount: existCount,
        });
    }
}

//全部成功回调
function onUploadAllSuccess() {
    if (typeof uploader.onAllSuccess == "function") {
        uploader.onAllSuccess({
            speed: 0,
        });
    }
}

// 失败回调
function onUploadError(photo, msg) {
    photo.xhr = null;

    //变更上传状态
    onUploadProgress(photo, "fail");

    //插入错误列表
    uploader.errorXHRs.push(photo);

    //移出上传文件列表
    removeXHRsList(uploader.uploadingXHRs, photo);

    //继续后边的上传
    checkQueueList();

    if (typeof uploader.onError == "function") {
        uploader.onError(photo, msg);
    }
}

/* 一群工具函数 */

// 检测浏览器是否会自动纠正图片的旋转角（通常会出现在80后的chrome和13.4.1后的IOS中）
function detectBrowser() {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            // 如果图片变成 1x2，说明浏览器对图片进行了回正
            var isImageAutomaticRotation = img.width === 1 && img.height === 2;

            resolve(isImageAutomaticRotation);
        };

        // 一张 2x1 的 JPEG 图片, EXIF Orientation: 6
        img.src =
            "data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAA" +
            "AAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA" +
            "QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE" +
            "BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/x" +
            "ABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAA" +
            "AAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==";
    });
}

//计算md5
function matchingMD5(result, file, salt) {
    const md5 = crypto
        .createHash("md5")
        .update(result + file.lastModified + salt)
        .digest("hex");
    return [
        md5.substring(0, 8),
        md5.substring(8, 12),
        md5.substring(12, 16),
        md5.substring(16, 20),
        md5.substring(20, 32),
    ].join("-");
}

//（当浏览器会自动修正旋转角时）根据旋转角处理图片角度
function FixRotate(img, orientation, size) {
    let w = img.width,
        h = img.height;

    if (size) {
        let ratio = w / h;
        w > h ? (w = size) && (h = w / ratio) : (h = size) && (w = h * ratio);
    }

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = orientation === 6 || orientation === 8 ? h : w;
    canvas.height = orientation === 6 || orientation === 8 ? w : h;

    if (orientation === 1) {
        //正常角度不需要旋转
        ctx.drawImage(img, 0, 0, w, h);
    } else if (orientation === 3) {
        ctx.rotate(Math.PI / 1);
        ctx.drawImage(img, -w, -h, w, h);
    } else if (orientation === 6) {
        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(img, -w, 0, w, h);
    } else if (orientation === 8) {
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(img, 0, -h, w, h);
    } else {
        //正常角度不需要旋转
        ctx.drawImage(img, 0, 0, w, h);
    }

    return canvas;
}

//转变日期格式
function convertData(d) {
    return (
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds()
    );
}

//检查时间格式
function checkDate(d) {
    //容错,有的拍摄时间是字符串的时间戳，导致new Date()错误
    var _d = isNaN(d) ? d : parseInt(d);

    var date = new Date(_d),
        time;

    function isValidDate(date) {
        //验证Date实例对象是否正确
        return date instanceof Date && !isNaN(date.getTime());
    }

    if (isValidDate(date)) {
        time = convertData(date);
    } else {
        //容错，有些拍摄时间后边会有一串乱码，过滤掉
        d = d.replace(/[^-:0-9]/g, " ");

        //容错这种格式'2017 :03 :01 20 :16'
        d = d.replace(/ :/g, ":");

        //上边过滤后替换成空格，所以有可能有多余的空格，分割空格再去掉多余的空格
        var list = d.split(" ").filter((item) => item);

        //年份用-分割
        time = list[0].replace(/:/g, "-");

        if (list[1]) {
            time += " " + list[1];
        }

        var time2 = time.replace(/-/g, "/"); //兼容IOS, IOS下需要 2020/10/28 19:40:07 才能new Date 有效

        //经过上边的容错后，再次检测格式，命中这个判断的就是新的未容错的奇葩格式
        if (!isValidDate(new Date(time)) && !isValidDate(new Date(time2))) {
            //两种判断都是无效的Date
            return undefined;
        }
    }

    //如果拍摄时间是'0000:00:00 00:00:00'存数据库报错
    if (time === "0000/00/00 00:00:00" || time.indexOf("NaN") !== -1) {
        return undefined;
    }
    return time;
}

//base64转blob
function dataURItoBlob(dataurl) {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

//获取后缀名
function getExt(fileName) {
    var ext = "jpg";

    if (fileName) {
        var str = fileName
            .split(".")
            [fileName.split(".").length - 1].toLowerCase();

        if (str === "jpg" || str === "png") {
            ext = str;
        }
    }

    return ext;
}

//获取照片上传路径
function getUploadPath(photo) {
    //获取后缀名
    var ext = getExt(photo.file.name);

    //oss上传路径 groupup/uid/xxx.jpg
    var uploadPath = "groupup/" + uploader.userId + "/" + photo.md5 + "." + ext;

    return uploadPath;
}

//处理文件名
//eslint-disable-next-line
function convertFileName(photo) {
    var fileName = photo.file.name.replace(/\$/g, ""); //过滤$符号

    //名字空的，或者没后缀名的，返回默认名字
    if (!fileName || fileName.lastIndexOf(".") === -1) return "default.jpg";

    //获取后缀名
    var ext = getExt(photo.file.name);

    //超出50长度后续接口会报错
    return (
        fileName
            .substring(0, fileName.lastIndexOf(".")) //去掉后缀名
            .substring(0, 50) + //截取前50个
        "." +
        ext
    );
}

window.uploader = uploader;
