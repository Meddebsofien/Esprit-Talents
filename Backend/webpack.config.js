const path = require('path');

module.exports = {
  mode: 'development',
  entry: './bin/www' ,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'final.js',
  },
  target: 'node',
  
};