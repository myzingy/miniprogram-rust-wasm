// hello.js是测试HelloWorld的例子
// require("hello.js");
//app.js
App({
  onLaunch: function () {
    var Rust = require("workers/stdwebdemo.js");

    Rust.then(function (demo) {
      let name = "Rust";
      console.log('demo',demo,demo.add(1,1));
    });
  }
})
