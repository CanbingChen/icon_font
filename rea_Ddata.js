const fs = require('fs');
function  readData(path){
    return new Promise(function(resolve,reject){
        fs.readFile(path,function(err,data){
            if(err){
                reject(err);//文件存在返回true
            }else{
                resolve(data);//文件不存在，这里会抛出异常
            }
        });
    }).then(function(data){
            console.log(data);
            return data;
        },function(err){
            console.log(err);
            return err;
        });
}
module.exports = readData;
