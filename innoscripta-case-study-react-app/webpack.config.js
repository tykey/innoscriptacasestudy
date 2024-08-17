const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const NEWS_API_ORG_KEY = '39a4b6fbeb6f4c8ab9df94b8cbe4a32d'
const THE_GUARDIAN_KEY = '723b1bd6-544b-4982-b02e-dfe40754abbf'
const NY_TIMES_KEY = 'zVGpwXcy4naorAVT6iWjGZOzzfk9CGwW'

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      favicon: path.join(__dirname, 'public', 'favicon.ico'),
    }),
    new webpack.DefinePlugin({
      'process.env.NEWS_API_ORG_KEY': JSON.stringify(NEWS_API_ORG_KEY),
      'process.env.THE_GUARDIAN_KEY': JSON.stringify(THE_GUARDIAN_KEY),
      'process.env.NY_TIMES_KEY': JSON.stringify(NY_TIMES_KEY),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: 3000,
  },
  module: {
    rules: [
      // `js` and `jsx` files are parsed using `babel`
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // `ts` and `tsx` files are parsed using `ts-loader`
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      {
        test: /(?<!background)\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /background\.(svg|png)$/i,
        issuer: /\.[jt]sx?$/,
        use: ['url-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.pdf$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.svg',
      '.css',
      '.pdf',
      '.png',
    ],
  },
}
