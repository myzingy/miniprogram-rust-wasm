#[macro_use]
extern crate stdweb;

use stdweb::js_export;

#[js_export]
fn add( x: i32 , y :i32) -> i32{
    x+y
}
fn main() {
    stdweb::initialize();

    let message = "Hello, 世界!";

    js! {
        wx.showModal({
        title: "提示",
        content: @{message}
        })
    }
    stdweb::event_loop();
}


