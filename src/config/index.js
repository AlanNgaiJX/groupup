const localHost = `http://${window.location.hostname}:3000/localServer`;
const betaHost = `http://${window.location.hostname}:3000/betaServer`;
const onlineHost = "http://18.162.113.209:9001/myServer";
const localTags = ["localhost", "192.168", "127.0.0.1", "172.20.10.3"];
const isLocal = localTags.some((item) => {
    return window.location.origin.includes(item);
});

const inBeta = false;

const host = isLocal ? (inBeta ? betaHost : localHost) : onlineHost;

const config = {
    host,
};

export default config;
