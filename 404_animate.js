if(window.innerWidth){
    console.log(window.innerWidth);
}
var canvas = document.getElementById("playground");
document.getElementById("title").addEventListener("click",initial);
var ctx = canvas.getContext("2d");

var colors = ["#92e8b6","#92e8d9","#4aa5cf","#4ac7cf","#4acfa8","#4acf89","#24932e","#09f81f","#09f81f"];
var courses = ["场","电荷载体","电势","电路","比特","逻辑","程序","处理器","数据","算法","数据包","网络","媒体","认知"];
var isAlive = true;
var box_size;
if(window.innerWidth>1000){
    box_size = 100;
}
else if(window.innerWidth>320){
    box_size = 80;
}
var box = class{
    constructor(_row,_column){
        this.row = _row;
        this.column = _column;
        this.x = _column*box_size+0.50*box_size;
        this.y = _row*box_size+0.50*box_size;
        this.width = 0;
        this.height = 0;
        this.speed = 0.1*box_size;
        this.level = 0;
    }
    draw(){
        
        ctx.fillStyle = "rgba(0,0,0,0.9)";
        ctx.fillRect(box_size/20+this.column*box_size,box_size/20+this.row*box_size,0.9*box_size,0.9*box_size);
        ctx.clearRect(box_size/20+this.column*box_size,box_size/20+this.row*box_size,0.9*box_size,0.9*box_size);
        ctx.lineWidth = 3;
        ctx.strokeStyle = colors[this.level];
        ctx.strokeRect(this.x,this.y,this.width,this.height);
        ctx.font = this.width/4.5+"px Microsoft Yahei";
        //console.log(ctx.font);
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.fillText(courses[this.level],0.5*box_size+box_size*this.column,0.55*box_size+box_size*this.row);
        //console.log("hh");
    }
    plaindraw(){
        ctx.lineWidth = 3;
        ctx.strokeStyle = colors[this.level];
        ctx.strokeRect(this.x-0.45*box_size,this.y-0.45*box_size,0.9*box_size,0.9*box_size);
        ctx.font = box_size/4.5+"px Micirosoft Yahei";
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.fillText(courses[this.level],0.5*box_size+box_size*this.column,0.55*box_size+box_size*this.row);
    }
    erase(){
        //ctx.fillStyle = "rgba(0,0,0,0.9)";
        //ctx.fillRect(this.column*100,this.row*100,100,100);
        ctx.clearRect(1+this.column*box_size,1+this.row*box_size,box_size-2,box_size-2);
        ctx.lineWidth = 3;
        //ctx.strokeStyle = "#000";
        //ctx.strokeRect(5+this.column*100,5+this.row*100,90,90);
    }
}
function Cmp(box1,box2){
    if((box1.row*4+box1.column)<(box2.row*4+box2.column)) return -1;
    else if((box1.row*4+box1.column)>(box2.row*4+box2.column)) return 1;
    else return 0;
}
//if(window.innerWidth>1000){
var allBox = new Set();
allBox.add(new box(1,1));
allBox.add(new box(1,2));
function draw(){
    randombox.draw();
    if(randombox.width<0.9*box_size){
    randombox.x-=randombox.speed/2.0;
    randombox.y-=randombox.speed/2.0;
    randombox.width+=randombox.speed;
    randombox.height+=randombox.speed;    
    raf = window.requestAnimationFrame(draw);
}
    else{
        window.cancelAnimationFrame(raf);
        //console.log("cancel");
    }
    
};
function initial(){
    if(window.innerWidth>1000){
    document.getElementById("title").innerHTML = "Tip: Use ↑ ↓ ← → to Combine the Same Two Blocks";
    }
    else if(window.innerWidth>320){
        document.getElementById("title").innerHTML = "Tip: Swipe left/right/up/down to Combine the Same Two Blocks";
    }
    $(canvas).fadeIn(1000);
    ctx.clearRect(0,0,4*box_size,4*box_size);
    ctx.strokeStyle = "#c2b39d";
    ctx.lineWidth = 2;
    ctx.strokeRect(0,0,4*box_size,4*box_size);
    //for(var i=0;i<4;i++){
    //    for(var j=0;j<4;j++){
            //ctx.strokeStyle = "#000";
            //ctx.lineWidth = 3;
            //ctx.strokeRect(5+100*j,5+100*i,90,90);
    //    }
    //}
    for(let item of allBox){
        item.plaindraw();
        //raf = window.requestAnimationFrame(draw);
        //if(item.width>=90) window.cancelAnimationFrame(raf);
    }
    canvas.removeEventListener("click",initial);
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
        randombox.x = box_size*randombox.column+0.5*box_size;
        randombox.y = box_size*randombox.row +0.5*box_size;
        randombox.width = 0;
        randombox.height = 0;
        draw();
        allBox.add(new box(randombox.row,randombox.column));
    }
    else isAlive = false;

}

//var temp = [];
var html = document.querySelector("html");
function handleLeft(){
    //handleLeft();
    for(i=0;i<4;i++){
        temp = [];
        for(let item of allBox){
            if(item.row === i && item.level>=0){
                temp.push(item);
                item.erase();
            }
        }
        temp.sort(Cmp);
        console.log("sorted");
        for(j=0;j<temp.length;j++)  console.log(temp[j].level);
        for(j=0;j<temp.length-1;j++){
            if(temp[j].level === temp[j+1].level){
                temp[j].level+=1;
                allBox.delete(temp[j+1]);
                temp.splice(j+1,1);
            }
        }
        for(j=0;j<temp.length;j++){
            temp[j].column = j;
            temp[j].x = box_size*j+0.5*box_size;
            temp[j].plaindraw();
        }
        //console.log(temp);
    }
}
function handleUp(){
    //handleUp();
    for(i=0;i<4;i++){
        temp = [];
        for(let item of allBox){
            if(item.column === i && item.level>=0){
                temp.push(item);
                item.erase();
            }
        }
        temp.sort(Cmp);
        console.log("sorted");
        for(j=0;j<temp.length;j++)  console.log(temp[j].level);
        for(j=0;j<temp.length-1;j++){
            if(temp[j].level === temp[j+1].level){
                temp[j].level+=1;
                allBox.delete(temp[j+1]);
                temp.splice(j+1,1);
            }
        }
        for(j=0;j<temp.length;j++){
            temp[j].row = j;
            temp[j].y = box_size*temp[j].row+0.5*box_size;
            temp[j].plaindraw();
        }
        //console.log(temp);
    }
}
function handleRight(){
    //handleRight();
    for(i=0;i<4;i++){
        temp = [];
        for(let item of allBox){
            if(item.row === i && item.level>=0){
                temp.push(item);
                item.erase();
            }
        }
        temp.sort(Cmp);
        console.log("sorted");
        for(j=0;j<temp.length;j++)  console.log(temp[j].level);
        for(j=temp.length-2;j>=0;j--){
            if(temp[j+1].level === temp[j].level){
                temp[j+1].level+=1;
                allBox.delete(temp[j]);
                temp.splice(j,1);
            }
        }
        for(j=temp.length-1;j>=0;j--){
            temp[j].column = j+4-temp.length;
            temp[j].x = box_size*temp[j].column+0.5*box_size;
            temp[j].plaindraw();
        }
        //console.log(temp);
    }
}
function handleDown(){
    //handleDown();
    for(i=0;i<4;i++){
        temp = [];
        for(let item of allBox){
            if(item.column === i && item.level>=0){
                temp.push(item);
                item.erase();
            }
        }
        temp.sort(Cmp);
        console.log("sorted");
        for(j=0;j<temp.length;j++)  console.log(temp[j].level);
        for(j=temp.length-2;j>=0;j--){
            if(temp[j+1].level === temp[j].level){
                temp[j+1].level+=1;
                allBox.delete(temp[j]);
                temp.splice(j,1);
            }
        }
        for(j=temp.length-1;j>=0;j--){
            temp[j].row = j+4-temp.length;
            temp[j].y = box_size*temp[j].row+0.5*box_size;
            temp[j].plaindraw();
        }
        //console.log(temp);
    }
}
if(window.innerWidth>1000){
html.addEventListener("keydown",process = function(event){
    //event.preventDefault();
    //for(i=0;i<16;i++) temp.push(-1);
    //for(let item of allBox) temp[item.row*4+item.column] = item.level;
    switch(event.keyCode){
        case 37://left
        //code
        event.preventDefault();
        handleLeft();
        generate();
        console.log(allBox);
        break;
        case 38://up
        //code
        event.preventDefault();
        handleUp();
        generate();
        console.log(allBox);
        break;
        case 39://right
        //code
        event.preventDefault();
        handleRight();
        generate();
        console.log(allBox);        
        break;
        case 40://down
        //code
        event.preventDefault();
        handleDown();
        generate();
        console.log(allBox);
    
        break;
        
    }
    //console.log(allBox);
    if(!isAlive) gameover();    
});
}
else if(window.innerWidth>320){
    canvas.addEventListener("swipeLeft",function(e){
        e.preventDefault();
        //left
        handleLeft();
        generate();
        if(!isAlive) gameover();
    });
    canvas.addEventListener("swipeRight",function(e){
        e.preventDefault();
        //right
        handleRight();
        generate();
        if(!isAlive) gameover();
    });
    canvas.addEventListener("swipeUp",function(e){
        e.preventDefault();
        //Up
        handleUp();
        generate();
        if(!isAlive) gameover();
    });
    canvas.addEventListener("swipeDown",function(e){
        e.preventDefault();
        //Down
        handleDown();
        generate();
        if(!isAlive) gameover();
    });
    
}
function gameover(){
    html.removeEventListener("keydown",process);
    ctx.clearRect(0,0,4*box_size,4*box_size);
    ctx.font="30px Cambira";
    ctx.textAlign = "center";
    ctx.fillStyle="#fff";
    ctx.fillText("Game Over",2*box_size,2*box_size);
    //ctx.fillText("[Smirk]",200,250);
    allBox.clear();
}
//}
//else{
    //mobile version

//}