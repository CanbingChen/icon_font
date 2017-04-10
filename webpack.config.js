var webpack = require('webpack'),
	path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'), // css单独打包
	HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html

// 变量声明
var _publicPath = '/public',
	_path = path.join(__dirname, 'public'),
	plugins = [];

// 对html的处理
plugins.push(new HtmlWebpackPlugin({
	template: './src/template/index.html', // html模板路径
	filename: '../index.html', // html模板对应生成的html存放路径, 相对于path
	hash: true // 为静态资源生成hash值
}));

// 对css的处理
plugins.push(new ExtractTextPlugin('[name].css')); // 对css单独处理

// 配置文件
var config = {
	// 页面的入口配置
	entry: [
		// 'webpack-dev-server/client?http://127.0.0.1:3009',
		'webpack-dev-server/client?http://127.0.0.1:3009',
		'./src/index'
	],
	// 入口文件输出位置
	output: {
		path: _path, // 编译到当前目录
		publicPath: _publicPath, // 编译好的文件, 在服务器的路径
		filename: '[name].js' // 编译好的文件名字
	},
	// 后缀名自动补全
	resolve: {
		extensions: ['', '.js', '.jsx', '.less']
	},
	// 加载器配置
	module:{
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel?presets=es2015&compact=false'
		}, {
			test: /\.jsx$/,
			exclude: /^node_modules$/,
			loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
		}, {
			test: /\.css$/,
			exclude: /(node_modules)/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
		}, {
			test: /\.less$/,
			exclude: /(node_modules)/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
		}, {
			test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
			exclude: /^node_modules$/,
			loader: 'file-loader?name=[name].[ext]'
		}, {
			test: /\.(png|jpg)$/,
			exclude: /(node_modules)/,
			loader: 'url?limit=2&name=[name].[ext]'
			// loader: 'url?limit=20000&name=[name].[ext]'
		}]
	},
	plugins
};

module.exports = config;
