const nodemailer = require('nodemailer');
const config = require('./config.js');
function sendEmaill(option){
	var transporter = nodemailer.createTransport({
	    service: 'qq',
	    port: 465, // SMTP 端口
	    secureConnection: true, // 使用 SSL
	    auth: config
	});
	var mailOptions = {
	    from: config.user, // 发件地址
	    to: 'chencanbing@wolongdata.com', // 收件列表
	    subject: option.subject, // 标题
	    //text和html两者只支持一种
	    text: option.text, // 标题
	    // html: '<b>Hello world ?</b>' // html 内容
	};
	transporter.sendMail(mailOptions, function(error, info) {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
}
module.exports = sendEmaill;
