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
      fx:1,//向量
      fy:1,
      mx:5,//步长
      my:5,
    }
    return this;
  }
  this.running=()=>{
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
  return this.init()
}
const circleGroup=function(num,width,height){
  this.circles=[];
  this.running=()=>{
    let that=this;
    return new Promise(function(success,fail){
      that.circles.forEach(circle=>{
        circle.running()
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
  },
  onLoad: function() {

  },
  circles:[],
  async onReady(e) {
    // 使用 wx.createContext 获取绘图上下文 context
    this.context = wx.createCanvasContext('canvas')
    let cgs=new circleGroup(100,this.data.width,this.data.height);
    //this.context.beginPath()
    //while(true){
      this.context.setFillStyle('lightgreen')
      await cgs.display(this.drawArc);
      this.context.draw()
    //}

  },
  onShow(){

  },
  drawArc(pos){
    let ctx=this.context;
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI)
    ctx.fill()
  },
})
