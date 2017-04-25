const request = require('request');
const https = require('https');
const sendEmaill = require('./send_emaill.js');
var config = {
	start_time : '10:56',
	leftTicketDTO : {
		train_date : '2017-05-01',
		from_station : 'VUW',
		to_station : 'CDW'
	},
	purpose_codes	:	'ADULT'
}
function getTicket(){
	var options = {
    hostname: 'kyfw.12306.cn',
    path: '/otn/leftTicket/query?leftTicketDTO.train_date=2017-05-01&leftTicketDTO.from_station=VUW&leftTicketDTO.to_station=CDW&purpose_codes=ADULT',
    rejectUnauthorized: false  // 忽略安全警告
};
	// var url = 'https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date=2017-05-01&leftTicketDTO.from_station=VUW&leftTicketDTO.to_station=CDW&purpose_codes=ADULT';
	https.get(options,function(res){
		var data = '';
	    /*设置邮箱信息*/
	    res.on('data',function(buff){
	    	data += buff;//查询结果（JSON格式）
	    });
	    res.on('end',function(){
	    	var jsonData;//用来保存返回的json数据
	    	try{
	    	 	jsonData = JSON.parse(data).data;
	    	}catch(e){
	    		return;
	    	}
	    	if(!jsonData||jsonData.length == 0){
	    		return;
	    	}
			var cars,keys=Object.keys(jsonData);
			for(var i =0,len=keys.length;i<len;i++){
				var car = jsonData[keys[i]].queryLeftNewDTO;
				if(car.start_time === config.start_time){
					cars = car;
					break;
				}
			}
			var surplus = {
				"ze_num" : '',
				"zy_num" : '',
				'wz_num' : ''
			};
			var carKeys = Object.keys(surplus);
			carKeys.forEach(function(key){
				surplus[key] = cars[key];
			});
			var result = carKeys.some(function(key){
				return surplus[key] === '有' || parseInt(surplus[key])>0;
			});
			console.log(result+'time:'+Date.now());
			if(result){
				var params = {
					subject : '有票了',
					text : '一等坐还剩'+surplus.zy_num+';二等还有'+surplus.ze_num+';无座还有'+surplus.wz_num,
				};
				sendEmaill(params);
			}
	    });
	}).on('error', function(err){
    // console.error(err);
});
}
module.exports = getTicket;
