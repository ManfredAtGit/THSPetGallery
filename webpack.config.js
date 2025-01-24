const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
<<<<<<< HEAD

module.exports = {
  mode: 'development', // Change this to 'production' or 'none' as needed
=======
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production', // Change this to 'development' or 'none' as needed
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
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
<<<<<<< HEAD
  },
  resolve: {
=======
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
    alias: {
      'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components'),
    },
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body', // Ensure the script tag is injected at the end of the body
    }),
<<<<<<< HEAD
=======
    
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/images', to:'images'},
        { from: 'public/css', to: 'css'},
      ],
    }),
    
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
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
<<<<<<< HEAD
  mode: 'development',
=======
  //mode: 'development',
>>>>>>> 4c392e3 (foto gallery with map extension, complete pet list)
  devtool: 'source-map',
};