const Path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")

// função utility que uso pra qualquer caminho necessário
const resolve = (...names) => Path.resolve(__dirname, ...names);

module.exports = {
  entry: resolve('src', 'index.jsx'),

  output: {
    path: resolve('public'),
    filename: 'app.js',
  },

  devServer: {
    port: 3001,
    contentBase: './public', // não sei se de repente isso muda
    historyApiFallback: true
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({template: resolve("./index.html") })
  ],

// ExtractTextPlugin foi depreciado, por isso não incluí ele aqui, na real ele não faz falta

module: {
  rules: [
    {
      test: /\.jsx?$/,
      use: ['babel-loader'],
    },

    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },

    {
      test: /\.(woff2?|ttf|eot|svg)$/, // tentei abreviar essa regra, se der ruim só usar o Regex antigo
      use: ['file-loader'],
    },

    {
      test: /\.(png|jpe?g|gif)$/i,
      use: ['file-loader'],
    },
  ],
  },

};