module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    cjs: false,
    umd: false
  },
  webpack: {
    rules: {
      'sass-css': {
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]'
      }
    }
  },
  babel: {
    plugins: 'eslint-disable'
  }
}
