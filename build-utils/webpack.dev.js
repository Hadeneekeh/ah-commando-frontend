const { DefinePlugin } = require('webpack');
const { config } = require('dotenv');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const env = config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new DefinePlugin(envKeys),
    new Dotenv()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    port: 9090,
    historyApiFallback: true,
  },
};
