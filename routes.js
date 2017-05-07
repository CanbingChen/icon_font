const fs = require('fs');
const formParse = require('co-busboy')
const config = require('./config.js');
const getTicket = require('./req_hcp.js')
const readData = require('./rea_Ddata.js');
const nodemailer = require('nodemailer');
const path = require('path');
const router = require('koa-router')();
const spawn = require('child_process').spawn
// const multer = require('koa-multer');
const parse = require('co-busboy');
// const multer  = require('koa-multer')
// const upload = multer({ dest: '/src/svgs/' })
router.get('/', indexView);
router.get('/signin', indexView);
router.get('/userPortrait_search', indexView);
router.get('/userPortrait_detail', indexView);

router.get('/api/download_all/',function*(next){
    var  p= 'fontcustom.zip';
        var filename = 'fontcustom.zip';
        var filepath= path.join(__dirname,p);
        var stats = fs.statSync(filepath);
        this.set('Content-disposition','attachment;filename='+filename);
        // this.set('Content-Type','application/octet-stream');
        //var output =fs.createReadStream(filepath);
        //console.log(output);
        //output.pipe(this.res);
        // var info =yield readData(filepath);
        // console.log(info);
        this.body=fs.createReadStream(filepath);
});
router.post('/api/upload/',function*(){
    var _this = this;
    var parts = parse(this);
    var part;
    var count = 0;
    while(part = yield parts){
        count++;

        var stream = fs.createWriteStream(path.resolve(__dirname,'./src/uploads') + '/' + part.filename);
        part.pipe(stream,{end: false});
        part.on('end',function(){
            if(count >= parts.length){
            }
        });
    }
    var sheel = spawn('fontcustom', ['compile','./src/uploads']);
    free.on('exit', function (code, signal) {
        console.log('文件已生成：' + code);
        _this.body = {
            code : 10000,
            msg : '上传成功'
        }
    });
    var transporter = nodemailer.createTransport({
        service: 'qq',
        port: 465, // SMTP 端口
        secureConnection: true, // 使用 SSL
        auth: config
    });
    var mailOptions = {
        from: config.user, // 发件地址
        to: 'chencanbing@wolongdata.com', // 收件列表
        subject: '我靠！人家上传了好东西啊！', // 标题
        //text: '今天有上传了'+count+'个图标',
        html: '今天有上传了'+count+'个图标<a href="http://127.0.0.1:3009/all">点击前往 ?</a>' // html 内容
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    console.log(parts.length);
    console.log(count);
});
// router.post('/api/upload/',multer({ dest: './src/svgs/'}).single(req.file))
// setInterval(function(){
//     getTicket();
// },500);
router.post('/api/send_emil/', function * (next) {
    var arr = fs.readdirSync('./src/svgs',{encoding:'utf8'});
    this.body = {
      code : 10000,
      data : {
        files : arr
      }
    }
});
router.post('/api/upload/',function*(){
    var _this = this;
    var parts = parse(this);
    var part;

    var count = 0;
    console.log('start',+new Date());
    while(part = yield parts){
        var stream = fs.createWriteStream(path.resolve(__dirname,'./src/svgs') + '/' + part.filename);
        part.pipe(stream,{end: false});
        part.on('end',function(){
            count++;
            if(count == parts.length){
                _this.body = {
                    "status" : 200
                }
            }
            console.log('uploading %s -> %s', part.filename, stream.path);
        });
    }
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
