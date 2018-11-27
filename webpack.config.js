const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  context: `${__dirname}/client`,
  entry: './index.jsx',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'spc_bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CompressionPlugin(),
  ],
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: [/node_modules/, /coverage/],
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-0'],
        },
      },
      {
        test: [/\.css$/],
        exclude: [/node_modules/, /coverage/],
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  externals: {
    'react/addons': true, // important!!
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true,
  },
};
