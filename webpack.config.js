var path = require('path');

module.exports = {
	entry: {
		'index': './src/index.js'
	},
	output: {
		path: './build',
		filename: 'entry.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react', 'stage-0'],
					plugins: [
	          'transform-decorators-legacy' //支持es7里面的decorators
	        ]
				}
			},
			{
				test: /\.styl?$/,
				loader: 'style-loader!css-loader!stylus-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
			},
			{
				test: /\.css?$/,
				loader: 'css-loader'
			},
			{
		    test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
		    loader: 'file-loader'
			}
		]
	}
}