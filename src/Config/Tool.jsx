export const Tool = {};
import axios from 'axios';
Tool.paramType = data => {
	let paramArr = [];
	let paramStr = '';
	for(let attr in data){
		paramArr.push(attr+'='+data[attr]);
	}
	paramStr = paramArr.join('&');
	paramStr = '?'+paramStr;
	return paramStr;
}
Tool.Fetch = (url,method,data) =>{
	var req = {
		method: method,
		url: url,
	};
	 (method === 'GET' || method === 'PUT') ? (req.params = data) : (req.data = data);
	return axios(req).then(function(response){
		console.log(response);
		return response.data;
	},function(err){
		console.log(err);
	});
}
