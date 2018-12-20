
var canvas = document.getElementById('canvas');		//找到画布元素
var context = canvas.getContext('2d');				//得到画笔
//构建方块对象
function Rect(x,y,w,h,color){		//x，y代表矩形左上角的点，w表示宽度，h表示高度
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
}
//画方块的方法
Rect.prototype.draw = function(){
	context.beginPath();			//开始画路径
	context.fillStyle = this.color;	//填充的颜色
	context.rect(this.x, this.y, this.w, this.h);	//心里想着在那个位置画好矩形
	context.fill();		//填充当前的路径
	context.stroke();	//绘制当前的路径
}
//蛇身的处理
function Snake(){
	var snakeArray = [];	//存放蛇身的数组
	for(var i=0;i<4;i++){
		var rect = new Rect(i*20, 0, 20, 20, 'gray');	//从(0,0)开始，画4个矩形当做蛇身
		snakeArray.unshift(rect);
		// snakeArray.splice(0,0,rect);	
		//也可以使用splice方法，在0位置删除0个元素，然后插入rect这个元素，也就是把新建的矩形放到数组的头部
	}
	var head = snakeArray[0];	//数组的第一个元素当做蛇头
	head.color = "red";			//蛇头的颜色置为红色
	this.head = snakeArray[0];	//将两个常用的变量定义为属性，方便后面的调用
	this.snakeArray = snakeArray;
	this.direction = 39;		//定义初始方向是右边
}
//画蛇的方法
Snake.prototype.draw = function(){
	for(var i=0; i<this.snakeArray.length; i++){
		this.snakeArray[i].draw();
	}
}

Snake.prototype.move = function(){
	var rect = new Rect(this.head.x, this.head.y, this.head.w, this.head.h, 'gray');	//新建一个蛇身，位置是此时蛇头的位置
	this.snakeArray.splice(1, 0, rect);//放在数组的蛇头后面处
	if(isEat()){	//如果吃到了食物
		food = new getRandomFood();	//则新生成随机食物
	} else{
		this.snakeArray.pop();		//把蛇尾去掉
	}
	//判断按键的方向  37左  38上  39右 40下
	switch(this.direction){
		case 37:  	
			this.head.x -= this.head.w;
			break;
		case 38:
			this.head.y -= this.head.h;
			break;
		case 39:
			this.head.x += this.head.w;
			break;
		case 40:
			this.head.y += this.head.h;
			break;
		default:
			break;
	}

	//撞墙判断
	if(this.head.x>canvas.width || this.head.x<0 || this.head.y>canvas.height || this.head.y<0){
		clearInterval(timer);
	}
	// 撞自己判断
	for(var i=1;i<this.snakeArray.length;i++){	//从蛇头后面的元素开始判断
		if(this.head.x===this.snakeArray[i].x && this.head.y===this.snakeArray[i].y){
			clearInterval(timer);
		}
	}	
}

var snake = new Snake();	//在脑海中想出蛇的轮廓
snake.draw();		//调用draw方法，画蛇
var food = new getRandomFood();	//初始化食物
var timer = setInterval(function(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	food.draw();
	snake.move();		//构建蛇开始动后的数组
	snake.draw();		//画蛇
},100);

document.onkeydown = function(e){
	var ev = e || window.event;
	switch (ev.keyCode) {
        case 37:
            {
                if (snake.direction !== 39) {
                    snake.direction = 37;
                }
                break;
            }
        case 38:
            {
                if (snake.direction !== 40) {
                    snake.direction = 38;
                }
                break;
            }
        case 39:
            {
                if (snake.direction !== 37) {
                    snake.direction = 39;
                }
                break;
            }
        case 40:
            {
                if (snake.direction !== 38) {
                    snake.direction = 40;
                }
                break;
            }
    }
    ev.preventDefault();
}
//获得区间内的随机数
function getNumberInRange(min, max){
	var range = max - min;
	var r = Math.random();
	return Math.round(r*range);
}

//构建食物对象
function getRandomFood(){
	var isOnSnake = true;	//判断食物是否出现在了蛇的身上
	while(isOnSnake){
		isOnSnake = false;
		var indexX = getNumberInRange(0,canvas.width/20 -1);
		var indexY = getNumberInRange(0,canvas.height/20 -1);
		var rect = new Rect(indexX*20, indexY*20, 20, 20, "yellow");
		for(var i=0; i<snake.snakeArray.length; i++){
			if(rect.x===snake.snakeArray[i].x && rect.y===snake.snakeArray[i].y){
				isOnSnake = true;
				break;
			}
		}
	}
	return rect;
}

//判定吃到食物，即蛇头坐标与食物坐标重合
function isEat() {
    if (snake.head.x == food.x && snake.head.y == food.y) {
        return true;
    } else {
        return false;
    }
}

function turnToPage(){
	window.location.href = 'index.html';
}