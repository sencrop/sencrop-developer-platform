module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/guide': { page: '/guide' },
      '/reference': { page: '/reference' },
      '/tools': { page: '/tools' },
    }
  },
  webpack: (config, { buildId, dev }) => {
    /*console.log(config)
    config.module.rules = config.module.rules.concat([
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]);*/
    return config
  }
}
