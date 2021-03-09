const routes = [
    {
        path: "/home",
        filePath: "@/pages/home/home.jsx",
        component: () => import("@/pages/home/home.jsx"),
        cache: true,
        saveScrollPosition: true,
        cacheKey: "home"
    },
    {
        path: "/group",
        exact: true,
        filePath: "@/pages/group/group.jsx",
        component: () => import("@/pages/group/group.jsx"),
        cache: true,
        saveScrollPosition: true,
        cacheKey: "group"
    },
    {
        path: "/group/my-group",
        exact: true,
        filePath: "@/pages/my-group/my-group.jsx",
        component: () => import("@/pages/my-group/my-group.jsx"),
    },
    {
        path: "/group/create-group",
        exact: true,
        filePath: "@/pages/create-group/create-group.jsx",
        component: () => import("@/pages/create-group/create-group.jsx"),
    },
    {
        path: "/group-detail",
        exact: true,
        filePath: "@/pages/group-detail/group-detail.jsx",
        component: () => import("@/pages/group-detail/group-detail.jsx"),
    },
    {
        path: "/create-blog",
        exact: true,
        filePath: "@/pages/create-blog/create-blog.jsx",
        component: () => import("@/pages/create-blog/create-blog.jsx"),
    },
    {
        path: "/me",
        exact: true,
        filePath: "@/pages/me/me.jsx",
        component: () => import("@/pages/me/me.jsx"),
        cache: true,
        saveScrollPosition: true,
        cacheKey: "me"
    },
    {
        path: "/me/info",
        exact: true,
        filePath: "@/pages/me-info/me-info.jsx",
        component: () => import("@/pages/me-info/me-info.jsx"),
    },
    {
        path: "/login",
        filePath: "@/pages/login/login.jsx",
        component: () => import("@/pages/login/login.jsx"),
    },
    {
        path: "/regist-phone",
        filePath: "@/pages/regist-phone/regist-phone.jsx",
        component: () => import("@/pages/regist-phone/regist-phone.jsx"),
    },
    {
        path: "/regist-verify",
        filePath: "@/pages/regist-verify/regist-verify.jsx",
        component: () => import("@/pages/regist-verify/regist-verify.jsx"),
    },
    {
        path: "/regist-pwd",
        filePath: "@/pages/regist-pwd/regist-pwd.jsx",
        component: () => import("@/pages/regist-pwd/regist-pwd.jsx"),
    },
    {
        path: "/test-page",
        filePath: "@/pages/test-page/test-page.jsx",
        component: () => import("@/pages/test-page/test-page.jsx"),
    },
];

export default routes;
