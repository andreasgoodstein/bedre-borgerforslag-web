const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src', 'index.jsx'),
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist/'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less'],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  useBuiltIns: 'entry',
                },
              ],
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                sourceMap: true,
                plugins: () => [autoprefixer({ grid: 'autoplace' })],
              },
            },
          },
          { loader: 'less-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ids.HashedModuleIdsPlugin(),

    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        'src/manifest.json',
        'src/service-worker/service-worker.js',
        'assets/**',
      ],
    }),
  ],
};
