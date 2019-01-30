// hello.js是测试HelloWorld的例子
// require("hello.js");
//app.js
import {vk,regeneratorRuntime} from 'vktool'
App({
  ...vk,
  regeneratorRuntime:regeneratorRuntime,
  onLaunch: function () {
    // var Rust = require("workers/stdcollision.js");
    // Rust.then(function (demo) {
    //   let name = "Rust";
    //   console.log('demo',demo);
    // });
  }
})
