let config = {
    publicPath: "./",
    outputDir: "dist",
    lintOnSave: false,
    runtimeCompiler: false,
    productionSourceMap: false,
    devServer: {
        host: "0.0.0.0",
        port: 8088,
        https: false
    },
    configureWebpack: {
        externals: {}
    }
};

if(process.env.NODE_ENV == 'development') {
    // 开发环境时 跨域代理
    config.configureWebpack.devtool = 'source-map'
};

module.exports = config;