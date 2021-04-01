const path = require('path');
const webpack = require('webpack')
const childProcess = require('child_process')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './app.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  // loader 추가, loader: 각 파일을 처리하는 역할
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
          ? MiniCssExtractPlugin.loader
          : 'style-loader', // 2 순서대로 실행
          'css-loader' //1
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader', // 2kb 미만은 base64로 인코딩, 이상은 file-loader가 실행
        options: {
          // publicPath: './dist/',
          name: '[name].[ext]?[hash]', //원본.확장자.hash
          limit: 20000 // 2kb
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      } 
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        Author: ${childProcess.execSync('git config user.name')}
      `
    }),
    new webpack.DefinePlugin({
      TWO: JSON.stringify('1+1'),
      'api.domain': JSON.stringify('http://dev.domain.com')
    }), 
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
      },
      minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true,
        removeComments: true
      } : false
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production' 
      ? [new MiniCssExtractPlugin({filename: '[name].css'})] 
      : []
    )
  ]
}

