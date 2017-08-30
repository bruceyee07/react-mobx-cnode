const webpack = require('webpack')
const path = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
	entry: {
		'index': './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'entry.js'
	},
	plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:9999' })
  ],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
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