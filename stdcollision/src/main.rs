#[macro_use]
extern crate stdweb;

use stdweb::js_export;
fn main() {
    println!("Hello, world!");
}
struct pos{
    x:i8,
    y:i8,
    fx:i8,//向量
    fy:i8,
    mx:f32,//步长
    my:f32,
    setFillStyle:String,
    fc:i8,//颜色向量
    size:i8,
}
struct circle {
    param:  pos,
}
impl circle{
    //边界碰撞
    fn boundary(&self){

    }
    //球体碰撞
    fn collision(&that:circle){

    }
}
fn circleInit(width:i32,height:i32)->circle{
    let p=pos{
        x:i8,
        y:i8,
        fx:i8,//向量
        fy:i8,
        mx:f32,//步长
        my:f32,
        setFillStyle:String,
        fc:i8,//颜色向量
        size:i8,
    };
    let cir=circle{
      param:p
    };
}


struct circleGroup{
    circles:[circle],
}
impl circleGroup{
    fn running(&self){

    }
    fn init(&self,num:i32,width:i32,height:i32) -> &self{
        for i in 0..num {
            sefl.circles[i]=circleInit(width,height)
        }
        &self
    }
    fn display(&self){

    }
}
fn circleGroupInit(num:i32,width:i32,height:i32) -> circleGroup{
    let cg=circleGroup{
        circles:[circle:num]
    };
    cg.init(num,width,height)
}
#[js_export]
fn add( x: i32 , y :i32) -> i32{
    x+y
}





