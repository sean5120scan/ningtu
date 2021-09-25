const {
    createProxyMiddleware
} = require("http-proxy-middleware")
module.exports = function (app) {
    app.use(createProxyMiddleware("/imageOnlineManager", {
        target: 'http://121.5.169.60:8081/imageOnlineManager',
        changeOrigin: true,
        pathRewrite: {
            "^/imageOnlineManager": ""
        }
    }))
}