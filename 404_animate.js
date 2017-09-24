var canvas = document.getElementById("playground");
var ctx = canvas.getContext("2d");
var colors = ["#92e8b6","#92e8d9","#4aa5cf","#4ac7cf","#4acfa8","#4acf89","#24932e","#09f81f","#09f81f"];
var courses = ["场","电荷载体","电势","电路","比特","逻辑","程序","处理器","数据","算法","数据包","网络","媒体","认知"];
var isAlive = true;
var box = class{
    constructor(_row,_column){
        this.row = _row;
        this.column = _column;
        this.x = _column*100+50;
        this.y = _row*100+50;
        this.width = 0;
        this.height = 0;
        this.speed = 10;
        this.level = 0;
    }
    draw(){
        ctx.clearRect(5+this.column*100,5+this.row*100,90,90);
        ctx.fillStyle = colors[this.level];
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.font = this.width/4.5+"px Microsoft Yahei";
        console.log(ctx.font);
        ctx.textAlign = "center";
        ctx.fillStyle = "#000000";
        ctx.fillText(courses[this.level],50+100*this.column,55+100*this.row);
        //console.log("hh");
    }
    plaindraw(){
        ctx.fillStyle = colors[this.level];
        ctx.fillRect(this.x-45,this.y-45,90,90);
        ctx.font = "20px Micirosoft Yahei";
        ctx.textAlign = "center";
        ctx.fillStyle = "#000000";
        ctx.fillText(courses[this.level],50+100*this.column,55+100*this.row);
    }
    erase(){
        ctx.clearRect(5+this.column*100,5+this.row*100,90,90);
    }
}
function Cmp(box1,box2){
    if((box1.row*4+box1.column)<(box2.row*4+box2.column)) return -1;
    else if((box1.row*4+box1.column)>(box2.row*4+box2.column)) return 1;
    else return 0;
}
var allBox = new Set();
allBox.add(new box(1,1));
allBox.add(new box(1,2));
function draw(){
    randombox.draw();
    if(randombox.width<90){
    randombox.x-=randombox.speed/2.0;
    randombox.y-=randombox.speed/2.0;
    randombox.width+=randombox.speed;
    randombox.height+=randombox.speed;    
    raf = window.requestAnimationFrame(draw);
}
    else{
        window.cancelAnimationFrame(raf);
        console.log("cancel");
    }
    
};
for(let item of allBox){
    item.plaindraw();
    //raf = window.requestAnimationFrame(draw);
    //if(item.width>=90) window.cancelAnimationFrame(raf);
}
for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
        ctx.fillStyle = "#FAF2E8";
        ctx.strokeRect(4+100*j,4+100*i,92,92);
    }
}
var randombox = new box(-1,-1);
function generate(){
    var available = [];
    for(i=0;i<16;i++) available.push(i);
    for(let item of allBox){
        available.splice(available.indexOf(item.row*4+item.column),1);
    }
    if(available.length>0){
        let index = available[Math.ceil((available.length-1)*Math.random())];
        randombox.row = (index-index%4)/4;
        randombox.column = index%4;
        randombox.x = 100*randombox.column+50;
        randombox.y = 100*randombox.row +50;
        randombox.width = 0;
        randombox.height = 0;
        draw();
        allBox.add(new box(randombox.row,randombox.column));
    }
    else isAlive = false;

}

var html = document.querySelector("html");
html.addEventListener("keydown",process = function(event){
    var temp = [];

    //for(i=0;i<16;i++) temp.push(-1);
    //for(let item of allBox) temp[item.row*4+item.column] = item.level;
    switch(event.keyCode){
        case 37://left
        //code
        for(i=0;i<4;i++){
            temp = [];
            for(let item of allBox){
                if(item.row === i && item.level>=0){
                    temp.push(item);
                    item.erase();
                }
            }
            temp.sort(Cmp);
            for(j=0;j<temp.length-1;j++){
                if(temp[j].level === temp[j+1].level){
                    temp[j].level+=1;
                    allBox.delete(temp[j+1]);
                    temp.splice(j+1,1);
                }
            }
            for(j=0;j<temp.length;j++){
                temp[j].column = j;
                temp[j].x = 100*j+50;
                temp[j].plaindraw();
            }
            //console.log(temp);
        }
        generate();
        console.log(allBox);
        break;
        case 38://up
        //code
        for(i=0;i<4;i++){
            temp = [];
            for(let item of allBox){
                if(item.column === i && item.level>=0){
                    temp.push(item);
                    item.erase();
                }
            }
            temp.sort(Cmp);
            for(j=0;j<temp.length-1;j++){
                if(temp[j].level === temp[j+1].level){
                    temp[j].level+=1;
                    allBox.delete(temp[j+1]);
                    temp.splice(j+1,1);
                }
            }
            for(j=0;j<temp.length;j++){
                temp[j].row = j;
                temp[j].y = 100*temp[j].row+50;
                temp[j].plaindraw();
            }
        }
        generate();
        break;
        case 39://right
        //code
        for(i=0;i<4;i++){
            temp = [];
            for(let item of allBox){
                if(item.row === i && item.level>=0){
                    temp.push(item);
                    item.erase();
                }
            }
            temp.sort(Cmp);
            for(j=temp.length-2;j>=0;j--){
                if(temp[j+1].level === temp[j].level){
                    temp[j+1].level+=1;
                    allBox.delete(temp[j]);
                    temp.splice(j,1);
                }
            }
            for(j=temp.length-1;j>=0;j--){
                temp[j].column = j+4-temp.length;
                temp[j].x = 100*temp[j].column+50;
                temp[j].plaindraw();
            }
            //console.log(temp);
        }
        generate();
        console.log(allBox);        
        break;
        case 40://down
        //code
        for(i=0;i<4;i++){
            temp = [];
            for(let item of allBox){
                if(item.column === i && item.level>=0){
                    temp.push(item);
                    item.erase();
                }
            }
            temp.sort(Cmp);
            for(j=temp.length-2;j>=0;j--){
                if(temp[j+1].level === temp[j].level){
                    temp[j+1].level+=1;
                    allBox.delete(temp[j]);
                    temp.splice(j,1);
                }
            }
            for(j=temp.length-1;j>=0;j--){
                temp[j].row = j+4-temp.length;
                temp[j].y = 100*temp[j].row+50;
                temp[j].plaindraw();
            }
        }
        generate();
    
        break;
        
    }
    if(!isAlive) gameover();    
});
function gameover(){
    html.removeEventListener("keydown",process);
    ctx.clearRect(0,0,400,400);
    ctx.font="30px Cambira";
    ctx.textAlign = "center";
    ctx.fillStyle="#FAF2E8";
    ctx.fillText("Which course are you in?",200,200);
    ctx.fillText("[Smirk]",200,250);
    allBox.clear();
}