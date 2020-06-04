const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const dotenv = require('dotenv');

// To prevent argv being undefined, let's use a default value
module.exports = (env = {}, argv = {}) => {
  const envPath = {};
  if (env.dev) {
    envPath.path = path.join(__dirname, 'config', '.env.dev');
  } else if (env.qa) {
    envPath.path = path.join(__dirname, 'config', '.env.qa');
  } else if (env.stg) {
    envPath.path = path.join(__dirname, 'config', '.env.stg');
  } else if (env.prod) {
    envPath.path = path.join(__dirname, 'config', '.env.prod');
  }
  dotenv.config(envPath);

  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, '/build'),
      filename: 'main.js',
    },
    devServer: {
      inline: true,
      port: 3001,
      historyApiFallback: true, // will redirect 404s to /index.html
    },
    devtool: 'source-map', // allow easy debugging in source tree in console
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
          test: /\.(gif|png|jpe?g|svg|ico)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
        {
          test: /\.(ogg|mp3|wav|mpe?g)$/i,
          use: 'file-loader',
        },
        {
          test: /\.(scss|css)$/i,
          use: [
            argv.mode === 'production'
              ? MiniCssExtractPlugin.loader // minify and provide as a single optimized file
              : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      // Any option given to Webpack client can be captured on the "argv"
      // generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        manifest: './public/manifest.json',
        favicon: './public/favicon.ico',
      }),
      argv.mode === 'production'
        ? new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
          })
        : null,
      env.analyse ? new BundleAnalyzerPlugin() : null, // will help you identify output files that take up the most space
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(argv.mode),
          API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
          APP_ID: JSON.stringify(process.env.APP_ID),
        },
      }),
    ].filter(
      // To remove any possibility of "null" values inside the plugins array, we filter it
      plugin => !!plugin,
    ),
  };
};
