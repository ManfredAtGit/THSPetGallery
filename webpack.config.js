const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Change this to 'production' or 'none' as needed
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
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
  },
  resolve: {
    alias: {
      'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components'),
    },
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body', // Ensure the script tag is injected at the end of the body
    }),
  ],
  devServer: {
    //contentBase: path.join(__dirname, 'dist'),
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
  mode: 'development',
  devtool: 'source-map',
};