const fs = require('fs');
const formParse = require('co-busboy')
const config = require('./config.js');
const getTicket = require('./req_hcp.js')
const readData = require('./rea_Ddata.js');
const nodemailer = require('nodemailer');
const path = require('path');
const router = require('koa-router')();
const spawn = require('child_process').spawn
const parse = require('co-busboy');
router.get('/api/download_all/',function*(next){
    var that = this;
    var p = 'fontcustom.zip';
        var filename = 'fontcustom.zip';
        var filepath= path.join(__dirname,p);
        var stats = fs.statSync(filepath);
        that.set('Content-disposition','attachment;filename='+filename);
        that.body=fs.createReadStream(filepath);
        spawn('rm', ['fontcustom.zip']);
});
router.get('/api/download/',function*(next){
    var p = 'fontcustom.zip';
        var filename = 'fontcustom.zip';
        var filepath= path.join(__dirname,p);
        var stats = fs.statSync(filepath);
        this.set('Content-disposition','attachment;filename='+filename);
        this.body=fs.createReadStream(filepath);
        spawn('rm', ['fontcustom.zip']);
});
router.get('/api/choose_finish/',function*(){
    var sheel = spawn('fontcustom', ['compile','-h','./src/choose']);
     sheel.on('exit', function (code, signal) {
       var zip = spawn('zip', ['-r','fontcustom.zip','fontcustom']);
        zip.on('exit',function(code, signal){
           var rmDir = spawn('rm', ['-rf','fontcustom','./src/choose']);
           rmDir.on('exit',function(code, signal){
               spawn('mkdir', ['./src/choose']);
           })
           spawn('rm',['.fontcustom-manifest.json']);
       })
    });
});
router.get('/api/choose_icon/',function*(next){
    if(this.request.query){
        var name = this.request.query.name;
        this.body = {
            code : 10000,
            msg : 'success',
        }
        var cp = spawn('cp',['./src/svgs/'+name,'./src/choose']);
        cp.stdout.on('data', function (data) {
            console.log('标准输出：\n' + data);
        });
        cp.on('exit',function(){

        });
    }
});
router.post('/api/upload/',function*(){
    spawn('rm', ['fontcustom.zip']);
    var _this = this;
    var parts = parse(this);
    var part;
    var count = 0;
    while(part = yield parts){
        count++;
        var stream = fs.createWriteStream(path.resolve(__dirname,'./src/uploads') + '/' + part.filename);
        var stream2 = fs.createWriteStream(path.resolve(__dirname,'./src/svg_upload') + '/' + part.filename);
         part.pipe(stream2,{end: false});
        part.pipe(stream,{end: false});
        // part.pipe(stream2,{end: false});
        part.on('end',function(){
            if(count >= parts.length){
            }
        });
    }
    _this.body = {
        code : 10000,
        msg : '上传成功'
    }
    var cp = spawn('cp', ['./src/uploads/*','./src/svgs/']);
    cp.stdout.on('data', function (data) {
        console.log('标准输出：\n' + data);
    });
    cp.on('exit',function(){
        var sheel = spawn('fontcustom', ['compile','-h','./src/uploads']);
        sheel.on('exit', function (code, signal) {
           var zip = spawn('zip', ['-r','fontcustom.zip','fontcustom']);
           zip.on('exit',function(code, signal){
            //    var cp = spawn('cp', ['./src/uploads/*','./src/svgs/']);
            // var cp = spawn('ls', ['-la','./src/uploads/']);
               cp.stdout.on('data', function (data) {
                   console.log('标准输出：\n' + data);
               });
            //    cp.on('exit',function(){
                   console.log('复制执行完成');
                   var rmDir = spawn('rm', ['-rf','fontcustom','./src/uploads']);
                   rmDir.on('exit',function(code, signal){
                       spawn('mkdir', ['./src/uploads']);
                   })
            //    });
               spawn('rm',['.fontcustom-manifest.json']);
           })
        });
    });

    // var downloadAll = spawn('fontcustom', ['compile','-n','fontcustoms','./src/uploads']);
    // downloadAll.on('exit', function (code, signal) {
    //    var zip = spawn('zip', ['-r','fontcustoms.zip','fontcustoms']);
    //    zip.on('exit',function(code, signal){
    //     //    var rmDir = spawn('rm', ['-rf','fontcustom','./src/uploads']);
    //     //    rmDir.on('exit',function(code, signal){
    //     //        spawn('mkdir', ['./src/uploads']);
    //     //    })
    //     //    spawn('rm',['.fontcustom-manifest.json']);
    //    })
    // });

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
        html: '今天有上传了'+count+'个图标<a href="http://127.0.0.1:3009/all">点击前往 ?</a>' // html 内容
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
});
router.post('/api/send_emil/', function * (next) {
    var arr = fs.readdirSync('./src/svgs',{encoding:'utf8'});
    this.body = {
      code : 10000,
      data : {
        files : arr
      }
    }
});
// router.post('/api/upload/',function*(){
//     var _this = this;
//     var parts = parse(this);
//     var part;
//     var count = 0;
//     while(part = yield parts){
//         var stream = fs.createWriteStream(path.resolve(__dirname,'./src/svgs') + '/' + part.filename);
//         part.pipe(stream,{end: false});
//         part.on('end',function(){
//             count++;
//             if(count == parts.length){
//                 _this.body = {
//                     "status" : 200
//                 }
//             }
//             console.log('uploading %s -> %s', part.filename, stream.path);
//         });
//     }
// });
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
