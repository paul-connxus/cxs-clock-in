var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, '10.10.208.228', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at 10.10.208.228:3000');
});
