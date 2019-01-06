const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const VENDOR_LIBS = [
  'react', 'react-dom'
]

const CSSModuleLoaders = [
  {
    loader:'style-loader',
  },
  {
    loader:'css-loader',
    query: {
      modules: true,
      localIdentName: '[name]__[local]___[hash:base64:5]'
    }
  },
  {
    loader:'postcss-loader',
    options: {
      plugins: [autoprefixer()]
    }
  }
]

const CSSLoaders = [
  {
    loader:'css-loader'
  },
  {
    loader:'postcss-loader',
    options: {
      plugins: [autoprefixer()]
    }
  },
  {
    loader:'resolve-url-loader'
  }
]

const SCSSLoaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      localIdentName: '[local]___[hash:base64:5]',
      importLoaders: 2,
      modules: true,
    }
  },
  {
    loader:'postcss-loader',
    options: {
      plugins: [autoprefixer()]
    }
  },
  {
    loader:'resolve-url-loader'
  },
  {
    loader:'sass-loader?sourceMap'
  }
]

const IMGLoaders = [
  {
    loader:'url-loader',
    options: {
      limit:40000,
      context:'assets',
      name:'[path][name].[ext]'
    }
  },
  {
    loader: 'image-webpack-loader',
    query: {
      mozjpeg: {
        progressive: true,
      },
      gifsicle: {
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 4,
      },
      pngquant: {
        quality: '75-90',
        speed: 3,
      }
    }
  }
]

module.exports = {
  mode: 'development',
  context: __dirname,
  devtool: 'cheap-module-eval-source-map',
  entry:{
    bundle: './src/index.jsx',
    vendor: VENDOR_LIBS
  },
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: 'js/[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: 'babel-loader',
        exclude:/node_modules/
      },
      {
        test: /\.json$/,
        use: 'json-loader'

      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: SCSSLoaders
        })
        //use: 'style-loader!css-loader!sass-loader?modules'
      },
      {
        //use: ['style-loader','css-loader?modules'],
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: CSSLoaders
        })
        //use: CSSModuleLoaders
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: IMGLoaders
      }
    ]
  },
  resolve: {
    modules:['node_modules'],
    extensions: ['.js', '.jsx', '.json', '.css', '.scss']
  },
  plugins: [
    new webpack.BannerPlugin('Copyright Maggie Ryder 2017.'),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.tmpl.html',
      filename: './index.html'
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names:['vendor','manifest']
    // }),
    new CleanWebpackPlugin(['dist'],{
      root: __dirname//,
      //exclude: ['images']
    }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // }),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash].css',
      allChunks: false
    }),
  ],

  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    inline: true
  }
}
