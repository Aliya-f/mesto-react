const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  } ,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: './src/index.html'
    }),
     new MiniCssExtractPlugin()
  ],
  devtool: 'inline-source-map',
  
 module: {
  rules: [
    {test: /\.(?:js|mjs|cjs)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      }
    },

    {test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, {
      loader: 'css-loader',
      options: {importLoaders: 1}}, "postcss-loader"],
    },
    {test: /\.(svg|jpe?g|gif|png)$/i,
    type: 'asset/resource',
    }
  ]
 }
}