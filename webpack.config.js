var path = require('path');

module.exports = {
	entry: {
		'index': './index.js'
	},
	output: {
		path: './build',
		filename: 'entry.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react', 'stage-0'],
				plugins: [
          'transform-decorators-legacy' //支持es7里面的decorators
        ]
			}
		}]
	}
}