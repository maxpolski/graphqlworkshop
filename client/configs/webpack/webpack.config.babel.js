import path from 'path';
import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';

const dirSrc = path.resolve(__dirname, '../../');
const dirBuild = path.resolve(__dirname, '../../dist');

export default {
  devtool: 'cheap-module-source-map',
  entry: [
    path.resolve(dirSrc, './index.js'),
  ],
  output: {
    path: dirBuild,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?/,
        exclude: /node_modules/,
        query: {
          presets: [
            'es2015',
            'stage-2',
            'react',
          ],
        },
      },
      {
        loaders: ['style-loader', 'css-loader'],
        test: /\.css/,
      },
      {
        loader: 'json-loader',
        test: /\.json/,
      },
      {
        loader: 'file-loader',
        query: {
          name: 'public/fonts/[name].[ext]',
        },
        test: /\.(eot|svg|ttf|woff|woff2)/,
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'url?limit=10000',
          'img?minimize',
        ],
      },
    ],
  },
  plugins: [
    new ProgressBarWebpackPlugin({
      clear: false,
    }),
  ],
  stats: {
    colors: true,
  },
};
