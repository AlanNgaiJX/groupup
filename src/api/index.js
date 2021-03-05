import instance from "./instance.js";
import common from "./common";
import blog from "./blog.js";
import group from "./group.js";
import login from "./login.js";
import regist from "./regist.js";
import message from "./message.js";
import test from "./test.js";

const Api = {};

common.install(Api, instance);
blog.install(Api, instance);
group.install(Api, instance);
login.install(Api, instance);
regist.install(Api, instance);
message.install(Api, instance);
test.install(Api, instance);

export default Api;
