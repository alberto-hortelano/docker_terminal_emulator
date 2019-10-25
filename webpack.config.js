const path = require('path');

module.exports = {
	entry: './dist/client/index.js',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: 'xtermClient.js',
		path: path.resolve(__dirname, 'static')
	},
	stats: 'normal',
	target: 'web',
	mode: 'development',
	watch: true
};
