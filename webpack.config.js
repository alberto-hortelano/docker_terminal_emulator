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
	context: __dirname, //set the context of the app to be the project directory
	node: {
		__dirname: true, //Allow use of __dirname in modules, based on context
		__filename: true
	},
	stats: 'normal',
	target: 'web',
	mode: 'development',
	watch: true
};
