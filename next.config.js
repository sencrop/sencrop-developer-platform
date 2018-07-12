const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
});

module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/guide': { page: '/guide' },
      '/partners': { page: '/partners' },
      '/reference': { page: '/reference' },
      '/tools': { page: '/tools' },
    }
  },
  webpack: config => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    config.plugins.push(new webpack.DefinePlugin(env));

    return config;
  }
}