var fs = require("fs");
var asmjs = fs.readFileSync("./target/asmjs-unknown-emscripten/release/collision.js", "utf-8");
//处理 注释掉 Module["arguments"]=arguments
var new_content = asmjs.replace('Module["arguments"]=arguments', '');
new_content = new_content.replace('Module["arguments"]=arguments', '');
fs.writeFileSync("./html/collision.js", new_content);
fs.writeFileSync("../miniprogram/workers/collision.js", new_content);