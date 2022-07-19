const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //去掉打包时生成的map文件
  productionSourceMap: false,
  //配置代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        //pathRewrite: { '^/api':'' }
      },
    },
  },
})
