module.exports = {
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './server'
    }
  },
  devServer:{
    host: 'localhost',
    hot:true,
    port: 8080,  
    open: 'Chrome',
    proxy: { //https://cli.vuejs.org/guide/html-and-static-assets.html#disable-index-generation
      '/*':{ //everything from root
        target: 'http://localhost:3000',
        secure: false,
        ws: false,
      },
      '!/':{ //except root, which is served by webpack's devserver, to faciliate instant updates
        target: 'http://localhost:3000/',
        secure: false,
        ws: false
      },
    }
  }
}
