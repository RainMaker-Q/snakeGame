
var direction = 'right';
var snakeBody = document.getElementsByName("snake");	//找到属性name为snake的元素，即蛇身
var snakeHead = snakeBody[0];							//存储蛇头信息
var food = document.getElementById("food");
var screen = document.getElementById("screen");
var speed = 350;
//蛇的移动，根据当前方向，蛇进行移动
function snakeMove(){
	tempLeft = snakeHead.style.left;						//得到蛇头左边像素坐标
	tempTop = snakeHead.style.top;							//得到蛇头右边像素坐标
	if(direction==='up'){									//判断方向，进行移动
		snakeHead.style.top = parseInt(tempTop)-20+'px';
	} else if(direction==='down'){
		snakeHead.style.top = parseInt(tempTop)+20+'px';
	} else if(direction==='left'){
		snakeHead.style.left = parseInt(tempLeft)-20+'px';
	} else if(direction==='right'){
		snakeHead.style.left = parseInt(tempLeft)+20+'px';
	}
	for(let i=snakeBody.length-1;i>0;i--){					//蛇身移动，从后往前移动，从蛇尾一次向前移动一个单位
		snakeBody[i].style.left = snakeBody[i-1].style.left;//但是蛇头后面的哪个元素不行
		snakeBody[i].style.top = snakeBody[i-1].style.top;
	}
	snakeBody[1].style.left = tempLeft;						//从尾巴往前走，蛇头后面的元素会跳到蛇头处
	snakeBody[1].style.top = tempTop;						//在这里给蛇头还未移动的坐标值			
}

function detectCollsion(){	//检测是否撞墙或者撞到自己身上
	var borderTop = parseInt(snakeHead.style.top);
	var borderLeft = parseInt(snakeHead.style.left);
	var collsion = false;
	if(borderTop>280 || borderTop<0 || borderLeft<0 || borderLeft>480){
		collsion = true;
	}
	for(let i=1;i<snakeBody.length;i++){
		if(snakeHead.style.top===snakeBody[i].style.top
			&& snakeHead.style.left===snakeBody[i].style.left){
			collsion = true;		
		}
	}
	if(collsion){
		var score = snakeBody.length-5;
		var tip = "游戏结束！您的得分是：" + score*10 +"分";
		clearInterval(timer);
		alert(tip);
	}
}

function eatFood(){		//吃到食物
	if(food.style.top===snakeHead.style.top
		&& food.style.left===snakeHead.style.left){
		creatFood();
		snakeAdd();
		speedUp();
	}
}

function creatFood(){	//新生成食物
	var foodLeft = parseInt(Math.random()*24)*20;		//想要获得20的倍数，这么写就好了
	var foodTop = parseInt(Math.random()*14)*20;
	food.style.left = foodLeft+'px';
	food.style.top = foodTop+'px';
	for(let i=0;i<snakeBody.length;i++){
		if(food.style.left===snakeBody[i].style.left
			&& food.style.top===snakeBody[i].style.top){
			creatFood();
		}
	}
}

function snakeAdd(){	//蛇身增加
	var temp = snakeBody[snakeBody.length-1].cloneNode(true);
	screen.appendChild(temp);
}

function speedUp(){
	if(snakeBody.length%6===0)
		speed = speed - parseInt(snakeBody.length/6)*50;
	if(speed<100)
		speed = 100;
}
var timer = setInterval(function() {
    snakeMove();
    detectCollsion();
    eatFood();
}, speed)

document.onkeydown = function(e){			//按键事件
	e = e|| window.event;//阻止浏览器默认事件
	var key = e.keyCode;
	if(key===37 && direction!=='right') direction = 'left';
	else if(key===38 && direction!=='down') direction = 'up';
	else if(key===39 && direction!=='left') direction = 'right';
	else if(key===40 && direction!=='up') direction = 'down';
	console.log(direction);
}

function turnToPage(){
	window.location.href='lrqcopy.html';
}