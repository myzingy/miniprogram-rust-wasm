# miniprogram-rust-wasm

Rust + Webassembly 开发微信小程序

环境依赖 rust && node
## rust
stdweb
cargo-web (可能依赖)

编译

cd stdwebdemo
./build.cmd

正确执行后将在根目录 miniprogram/workers 下生成 js和wasm文件；小程序中引入对应js文件即可使用；
````angular2html
var Rust = require("workers/stdwebdemo.js");

    Rust.then(function (demo) {
      let name = "Rust";
      console.log('demo',demo,demo.add(1,1));
    });
````

