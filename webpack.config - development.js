const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development', // toggle between 'production' and 'development' or 'none' as needed
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components'),
    },
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body', // Ensure the script tag is injected at the end of the body
    }),
    // needed for deploying to gh-pages
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to:'public'},
      ],
    }),
    
  ],
  devServer: {
    //contentBase: path.join(__dirname, 'dist'),
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
  mode: 'development', // comment when  run as production
  devtool: 'source-map',
};