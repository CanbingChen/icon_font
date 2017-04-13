const fs = require('fs');
const config = require('./config.js');
const readData = require('./rea_Ddata.js');
const nodemailer = require('nodemailer');
const path = require('path');
const router = require('koa-router')();

router.get('/', indexView);
router.get('/signin', indexView);
router.get('/userPortrait_search', indexView);
router.get('/userPortrait_detail', indexView);
router.get('/api/download_all/',function*(next){
    var  p= '1.zip';
        var filename = '1.zip';
        console.log(filename);
        var filepath= path.join(__dirname+'/src/images/',p);
        console.log(filepath);
        this.set('Content-disposition','attachment;filename='+filename);
        //var output =fs.createReadStream(filepath);
        //console.log(output);
        //output.pipe(this.res);
        var info =yield readData(filepath);
        console.log(info);
        this.body=info;
});
router.post('/api/send_emil/', function * (next) {
    var arr = fs.readdirSync('./src/svgs',{encoding:'utf8'});
    this.body={
        code:10000,
        data:{
            files : arr
        }
    }
    // var transporter = nodemailer.createTransport({
    //     service: 'qq',
    //     port: 465, // SMTP 端口
    //     secureConnection: true, // 使用 SSL
    //     auth: config
    // });
    // var mailOptions = {
    //     from: config.user, // 发件地址
    //     to: 'chencanbing@wolongdata.com', // 收件列表
    //     subject: '我靠！发送邮件原来是这么简单！', // 标题
    //     //text和html两者只支持一种
    //     text: 'Hello world', // 标题
    //     html: '<b>Hello world ?</b>' // html 内容
    // };
    // transporter.sendMail(mailOptions, function(error, info) {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message sent: ' + info.response);
    // });
});
var readFileThunk = function(src) {
    return new Promise(function(resolve, reject) {
        fs.readFile(src, {
            'encoding': 'utf8'
        }, function(err, data) {
            if (err)
                return reject(err);
            resolve(data);
        });
    });
}

function * indexView(next) {
    var html = yield readFileThunk(path.join(__dirname, '/client/public/templates/modules/core/frame.tpl.html'));
    this.body = html;
}

module.exports = router;
