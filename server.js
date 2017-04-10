var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var proxy = [{
	path : '/api/*',
	target : 'http://localhost:3333',
	host:'localhost:3333'
	// path: '/*/*', //必须得有一个文件地址，如果顶层文件夹名字不同，则用/*代替
	// target: 'http://dev.fe.ptdev.cn',
	// host: 'dev.fe.ptdev.cn',
	// secure: false
}]

var server = new webpackDevServer(webpack(config),{
	publicPath : config.output.publicPath,
	// hot : true,
	historyApiFallback : true,
	inline : true,
	progress : true,
	proxy:proxy
});

/**
 * 将其它路由, 全部返回index.html
 * @param  {[type]} req                           [description]
 * @param  {[type]} res){	res.sendFile(__dirname +             '/index.html');} [description]
 * @return {[type]}                               [description]
 */
server.app.get('*',function(req,res){
	res.sendFile(__dirname + '/index.html');
})


server.listen(3009,'0.0.0.0',function(err,result){
	if(err){
		return console.log(err);
	}
	console.log('http://0.0.0.0:3009/');
});
