function shape(canvas,copy,cobj) {   //画布  2d对象
    this.canvas=canvas;
    this.cobj=cobj;
    this.copy=copy;
    this.width=canvas.width;
    this.height=canvas.height;
    this.type="line";
    this.style="stroke";
    this.bianNum="5";
    this.jiaoNum=5;
    this.strokeStyle="#000";
    this.fillStyle="#000";
    this.lineWidth=1;
    this.history=[];
}
shape.prototype={
    init:function(){
        this.cobj.lineWidth=this.lineWidth;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.fillStyle=this.fillStyle;
    },
    draw:function(){
        var that=this;          //that this
        that.copy.onmousedown=function(e){
            var startx=e.offsetX;
            var starty=e.offsetY;
            that.copy.onmousemove=function(e){
                that.init();
                that.cobj.clearRect(0,0,that.width,that.height);//清空
                var endx=e.offsetX;
                var endy=e.offsetY;
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that.cobj.beginPath();
                that[that.type](startx,starty,endx,endy);
            }
            that.copy.onmouseup=function(e){
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }
        }
    },
    line:function(x,y,x1,y1){
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj.stroke();
    },
    rect:function (x,y,x1,y1) {
        this.cobj.beginPath();
        this.cobj.rect(x,y,x1-x,y1-y);
        /*this.cobj.fill();*/
        this.cobj[this.style]();
    },
    arc:function(x,y,x1,y1){
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.arc(x,y,r,0,2*Math.PI);
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    bian:function(x,y,x1,y1){
        this.cobj.beginPath();
        var angle=360/this.bianNum*Math.PI/180; //弧度角度--1弧度=180/π度；1度=π/180弧度
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        for(var i=0;i<this.bianNum;i++){
            var x=Math.cos(angle*i)*r+x;
            var y=Math.sin(angle*i)*r+y;
            this.cobj.lineTo(x,y);
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    jiao:function(x,y,x1,y1){
        this.cobj.beginPath();
        var angle=360/(this.jiaoNum*2)*Math.PI/180; //弧度角度--1弧度=180/π度；1度=π/180弧度
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        for(var i=0;i<this.jiaoNum*2;i++){
            if(i%2==0){
                var a=Math.cos(angle*i)*r+x;
                var b=Math.sin(angle*i)*r+y;
                this.cobj.lineTo(a,b);
            }else{
                var a=Math.cos(angle*i)*r1+x;
                var b=Math.sin(angle*i)*r1+y;
                this.cobj.lineTo(a,b);
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    pen:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            var sx=e.offsetX;
            var sy=e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(sx,sy);
            that.copy.onmousemove=function(e){
                that.init();
                var ex=e.offsetX;
                var ey=e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0)
                }
                that.cobj.lineTo(ex,ey);
                that.cobj.stroke();
            }
            that.copy.onmouseup=function(){
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height))
            }
        }
    },
    eraser:function(){
        var that=this;
        that.copy.onmousemove=function(e){
            var sx=e.offsetX;
            var sy=e.offsetY;
            console.log(sy);
            $(".eraser").css({
                top:sy+"px",
                left:sx+"px"
            })
            that.copy.onmouseup=function(){
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }
        }
    }
}
