//index.js
const app= getApp()
const {regeneratorRuntime} = app
const circle = function(width,height){
  this.param={}
  this.init=()=>{
    let x=parseInt(Math.random()*width);
    let y=parseInt(Math.random()*height);
    this.param={
      x:x,
      y:y,
      fx:Math.random()*10>5?1:-1,//向量
      fy:Math.random()*10>5?1:-1,
      mx:1,//步长
      my:1,
      setFillStyle:'#000000',
      fc:100,//颜色向量
      size:4,
    }
    return this;
  }
  //边界碰撞
  this.boundary=()=>{
    let x=this.param.x+this.param.mx*this.param.fx;
    if(x<=0 || x>=width){
      this.param.fx*=-1;
      this.param.x=x<=0?0:width;
    }else{
      this.param.x=x
    }
    let y=this.param.y+this.param.my*this.param.fy;
    if(y<=0 || y>=height){
      this.param.fy*=-1;
      this.param.y=y<=0?0:height;
    }else{
      this.param.y=y
    }
  }
  //球体碰撞
  this.collision=(that)=>{
    let defx=this.param.x-that.param.x;
    let defy=this.param.y-that.param.y;
    let xy=Math.pow(defx*defx+defy*defy,0.5)
    if(xy<=this.param.size){
      //this.param.setFillStyle=this.param.setFillStyle=='lightgreen'?'red':'lightgreen';
      //that.param.setFillStyle=that.param.setFillStyle=='lightgreen'?'red':'lightgreen';
      if(this.param.fx!=that.param.fx){
        this.param.fx*=-1;
        that.param.fx*=-1;
        //this.param.mx+=0.5;
      }
      if(this.param.fy!=that.param.fy){
        this.param.fy*=-1;
        that.param.fy*=-1;
        //this.param.my+=0.5;
      }
      this.color()
    }
  }
  //color
  this.color=()=>{
    let padNumber=function(num, fill) {
      var len = ('' + num).length;
      return (Array(
        fill > len ? fill - len + 1 || 0 : 0
      ).join(0) + num);
    }
    // let rgb16=this.param.setFillStyle.replace('#','');
    // let rgb10=parseInt(rgb16,16)
    // rgb10+=this.param.fc;
    // if(rgb10<=0 || rgb10>=16777215){
    //   rgb10=rgb10<=0?0:16777215
    //   this.param.fc*=-1;
    // }
    // rgb16=rgb10.toString(16);

    let rgb10=parseInt(Math.random()*16777215);
    let rgb16=rgb10.toString(16);
    this.param.setFillStyle='#'+padNumber(rgb16,6)
  }
  return this.init()
}
const circleGroup=function(num,width,height){
  this.circles=[];
  this.running=()=>{
    let that=this;
    return new Promise(function(success,fail){
      that.circles.forEach(circle=>{
        //边界碰撞
        circle.boundary()

        //球体碰撞
        that.circles.forEach(circle2=>{
          circle.collision(circle2)
        })

      })
      success();
    })
  }
  this.init=()=>{
    for(let i=0;i<num;i++){
      this.circles.push(new circle(width,height))
    }
    //console.log('this.circles',this.circles)
    return this;
  }
  this.display=async (draw)=>{
    await this.running()
    this.circles.forEach(circle=>{
      //console.log('draw(circle.param);',circle.param)
      draw(circle.param);
    })
  }
  return this.init(num,width,height)
}
Page({
  data:{
    width:300,
    height:500,
    num:800,
  },
  onLoad: function() {
    var Rust = require("../../workers/stdcollision.js");
    Rust.then((demo)=>{
      let name = "Rust";
      console.log('demo',demo,demo.circle_group_init(this.data.num,this.data.width,this.data.height));
    })
  },
  circles:[],
  scheduledAnimationFrame:false,
  onReady(e) {
    // 使用 wx.createContext 获取绘图上下文 context
    this.context = wx.createCanvasContext('canvas')
    this.cgs=new circleGroup(this.data.num,this.data.width,this.data.height);
    setInterval(()=>{
      this.draw()
    },1000/60)

  },
  onShow(){

  },
  async draw(){
    if (this.scheduledAnimationFrame) { return }

    let stime=new Date().getTime();
    //console.time('AAA')
    this.scheduledAnimationFrame=true
    await this.cgs.display(this.drawArc);
    this.putTime(stime)
    this.context.draw()
    this.scheduledAnimationFrame=false

    //this.draw();
    //console.timeEnd('AAA')

  },
  drawArc(pos){
    let ctx=this.context;
    //ctx.beginPath()
    ctx.setFillStyle(pos.setFillStyle)
    //ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI)
    ctx.fillRect(pos.x-pos.size/2, pos.y-pos.size/2, pos.size, pos.size)
    //ctx.fill()
  },
  putTime(stime){
    let etime=new Date().getTime();
    let time=etime-stime;
    let ctx=this.context;
    ctx.setFontSize(20)
    ctx.setFillStyle('red')
    ctx.fillText('FPS:'+parseInt(1000/time), 20, 20)
  },
})
