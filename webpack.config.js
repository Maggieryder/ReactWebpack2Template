const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const VENDOR_LIBS = [
  'react', 'react-dom'
]

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry:{
    bundle: './src/index.jsx',
    vendor: VENDOR_LIBS
  },
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js|jsx$/,
        exclude:/node_modules/
      },
      {
        use: 'json-loader',
        test: /\.json$/
      },
      {
        use: ['style-loader','css-loader'],
        test: /\.css$/
        //use: 'style-loader!css-loader?modules'
      },
      {
        use: ['style-loader','css-loader', 'sass-loader'],
        test: /\.scss$/
        //use: 'style-loader!css-loader!sass-loader?modules'
        //use: 'style-loader!css-loader!sass-loader?modules'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  plugins: [
    new webpack.BannerPlugin('Copyright Maggie Ryder 2017.'),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.tmpl.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names:['vendor','manifest']
    }),
    new CleanWebpackPlugin(['dist'],{
      root: __dirname,
      exclude: ['images']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],

  /*postcss: [
    require('autoprefixer')
  ],*/
  devServer: {
    contentBase: './dist',
    //colors: true,
    historyApiFallback: true,
    inline: true
  }
}