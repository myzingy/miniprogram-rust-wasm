var fs = require("fs");
var path=require('path');

var modName=path.basename(path.resolve())
var target="./target/wasm32-unknown-unknown/release/";
var dist="../miniprogram/workers/"

//copy the $file to $dir2
var copyFile = (file, dir2)=>{

  //gets file name and adds it to dir2
  var f = path.basename(file);
  var source = fs.createReadStream(file);
  var dest = fs.createWriteStream(path.resolve(dir2, f));

  source.pipe(dest);
  source.on('end', function() { console.log(file+'=>'+dir2+',Succesfully copied'); });
  source.on('error', function(err) { console.log(err); });
};

console.log('modName:',modName);
//copy wasm
copyFile(target+modName+'.wasm',dist)

//copy js
var asmjs = fs.readFileSync(target+modName+".js", "utf-8");
var new_content = asmjs.replace('"use strict";',`
"use strict";
WebAssembly.instantiateStreaming='';
var fetch = function (filePath,param={}) {
  return new Promise(function (resolve, reject) {
    let fsm = wx.getFileSystemManager();
    fsm.readFile({
      filePath: '/workers/'+filePath,
      success: function (res) {
        console.log('fsm.readFile.success',res.data);
        res.data.arrayBuffer=function () {
          return res.data
        }
        resolve(res.data);
      },
      fail: function (err) {
          console.log('fsm.readFile.fail',err);
        reject(err);
      }
    });
  })
}
`);
fs.writeFileSync(dist+modName+".js", new_content);
console.log(dist+modName+".js,Succesfully copied");