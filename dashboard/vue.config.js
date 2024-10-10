const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 여기에 devServer 설정을 추가하면 됩니다.
  devServer: {
    proxy: {
      '*': {
        target: 'http://43.203.239.57:8000',
        changeOrigin: true,
        pathRewrite: { '^/': '/' },
      },
    },
  },
})
