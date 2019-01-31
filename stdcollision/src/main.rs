#[macro_use]

extern crate stdweb;
extern crate rand;
use stdweb::js_export;
use rand::Rng;

fn main(){}

#[derive(Debug)]
pub struct Pos{
    x:i32,
    y:i32,
    fx:i32,//向量
    fy:i32,
    mx:i32,//步长
    my:i32,
    set_fill_style:String,
    fc:i32,//颜色向量
    size:i32,
}
#[derive(Debug)]
pub struct Circle {
    param:  Pos,
}
impl Circle{
    //边界碰撞
    fn boundary(&mut self,width:i32,height:i32){
        let x=self.param.x+self.param.mx*self.param.fx;
        if x<=0 || x>=width{
            self.param.fx*=-1;
            self.param.x=if x<=0{0}else{width};
        }else{
            self.param.x=x
        }
        let y=self.param.y+self.param.my*self.param.fy;
        if y<=0 || y>=height {
            self.param.fy*=-1;
            self.param.y=if y<=0{0}else{height};
        }else{
            self.param.y=y
        }
    }
    //球体碰撞
    fn collision(&mut self,_that:Circle){

    }
    fn color(&mut self){

    }
}
pub fn circle_init(width:i32,height:i32) -> Circle{
    let p=Pos{
        x:rand::thread_rng().gen_range(0, width),
        y:rand::thread_rng().gen_range(0, height),
        fx:if rand::thread_rng().gen_range(0, 10)>5 {1}else{-1},//向量
        fy:if rand::thread_rng().gen_range(0, 10)>5 {1}else{-1},
        mx:1,//步长
        my:1,
        set_fill_style:"#000000".to_string(),
        fc:100,//颜色向量
        size:4,
    };
    //println!("circle.print:{:?}",p);
    let ci=Circle{
        param:p
    };
    //println!("circle.print:{:?}",ci);
    return ci;
}


pub struct CircleGroup{
    circles:Vec<Circle>,
    width:i32,
    height:i32,
}

impl CircleGroup{
    fn running(&mut self){
        for cir in &mut self.circles {
            //边界碰撞
            cir.boundary(self.width,self.height)
        }
    }
    fn init(&mut self,num:i32,width:i32,height:i32){
        for _i in 0..num {
            let ci=circle_init(width,height);
            self.circles.push(ci)
        }
    }
    fn display(&mut self){
        self.running();
        //println!("CircleGroup.print:{:?}",self);
    }
}

#[js_export]
fn circle_group_init(num:i32,width:i32,height:i32){
    let mut cg=CircleGroup{
        circles:Vec::new(),
        width:width,
        height:height,
    };
    cg.init(num,width,height);
    js! {
        //console.log("cg.circles",@{cg.width})
        console.log("circle_group_init end")
    }
}