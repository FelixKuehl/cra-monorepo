const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        loader:
          'style-loader!css-loader?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
      },

      {
        test: /\.(woff|woff2|eot|ttf|svg|gif|png)$/,
        use: 'url-loader'
      }
    ]
  }
}
