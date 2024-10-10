const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// const { defineConfig } = require('@vue/cli-service')

// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     proxy: {
//       '/': {
//         target: 'http://43.203.239.57:8000',  // 백엔드 서버 URL
//         secure: false,  // HTTPS가 아닌 HTTP 요청을 허용
//         changeOrigin: true  // 요청의 origin 헤더를 백엔드 서버로 설정
//       }
//     }
//   }
// })
