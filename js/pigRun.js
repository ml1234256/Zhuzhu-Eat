

// background image
var bgImg = document.getElementsByClassName("bg-img")[0];
bgImg.style.width = getViewportOffset().w - 3 + "px";
bgImg.style.height = getViewportOffset().h - 5 + "px";

//pig
var pigWrap = document.getElementsByClassName("pigwrap")[0];
var pig = document.getElementsByClassName('pig')[0];

// pig dialog box
var dialogBox = document.getElementsByClassName('dialogBox')[0];
var dialogContent = document.getElementsByClassName("dialogContent")[0]
pigWrap.onclick = function() {
	dialogBox.style.display = "block";
	dialogContent.style.width = "120px";
	dialogContent.style.right = "-150px";
	dialogContent.innerHTML = "不要点猪猪😕";
}

var interDia = setInterval(function(){
	if(dialogBox.style.display == 'none') {
		dialogBox.style.display = 'block';
		dialogContent.style.width = "80px";
		dialogContent.style.right = "-110px";
		dialogContent.innerHTML = "猪猪要吃";
	}else{
		dialogBox.style.display = 'none';
	}
}, 3500);

// Pig run
var flyWeight = 200;
var speed = 12;
document.onkeydown = function(event) {
    if(event.keyCode == 37) { // left
		pigWrap.style.left = parseInt(getStyle(pigWrap, "left")) - speed > 0 ? parseInt(getStyle(pigWrap, "left")) - speed + "px" : 10 + "px";
		//pigWrap.style.transform = 'rotateY(180deg)';
		eatFood();
    }
    if(event.keyCode == 38) { // up
		pigWrap.style.top = parseInt(getStyle(pigWrap, "top")) - speed > 0 ? parseInt(getStyle(pigWrap, "top")) - speed + "px" : 0 + "px";
		eatFood();
    }
    if(event.keyCode == 39) { // right
        pigWrap.style.left = parseInt(getStyle(pigWrap, "left")) + speed < getViewportOffset().w - parseInt(getStyle(pigWrap, "width")) ? 
		parseInt(getStyle(pigWrap, "left")) + speed + "px" : getViewportOffset().w - parseInt(getStyle(pigWrap, "width")) -10 + "px";
		eatFood();
    }
    if(event.keyCode == 40) { // down
        pigWrap.style.top = parseInt(getStyle(pigWrap, "top")) + speed < getViewportOffset().h - parseInt(getStyle(pigWrap, "height")) ? 
		parseInt(getStyle(pigWrap, "top")) + speed + "px" : getViewportOffset().h - parseInt(getStyle(pigWrap, "height")) - 0 + "px";
		eatFood();
    }
   
}
// pig fly
var pigFlyElem = document.getElementsByClassName('pigFly')[0]; 
pigFlyElem.style.lineHeight = getStyle(pigFlyElem, 'height');
function pigFly() {
	document.onkeydown = null;
	clearInterval(interDia);
	dialogBox.style.display = "block";
	dialogContent.innerHTML = "T_T";
	inter = setInterval(function(){
		pigWrap.style.top = parseInt(getStyle(pigWrap, 'top')) - 25 + 'px';
		if(parseInt(pigWrap.style.top) < -250){
			clearInterval(inter);
			pigFlyElem.style.display = 'block';
		}
	}, 500);

}


// food
var food = document.getElementsByClassName('foodwrap');
var foodPos = []
var feedBtn = document.getElementsByClassName('feed')[0];
feedBtn.onclick = function() {
	for(var i = 0; i < food.length; i++) {
		if(food[i].style.right == '40px' && food[i].style.bottom == '20px') {
			var rand = randomAxe();
			food[i].style.transitionDuration = '0.4s';
			food[i].style.right = rand.x - 60 > 0 ? rand.x - 60 + 'px' : '20px';
			food[i].style.bottom = rand.y - 60 > 0 ? rand.y - 60 + 'px': '20px';
			foodPos[i] = [parseInt(food[i].style.right) + 22, parseInt(food[i].style.bottom) + 22];
		}
	}
}

function randomAxe() {
	return {
		x: Math.random() * getViewportOffset().w,
		y: Math.random() * getViewportOffset().h
	}
}

// pig eat
function eatFood(){
	for(var i=0; i<foodPos.length; i++){
		if(foodPos[i] && Math.abs(parseInt(getStyle(pigWrap, 'right'))+parseInt(getStyle(pigWrap, 'width'))/2-foodPos[i][0])<50 && 
		Math.abs(parseInt(getStyle(pigWrap, 'bottom'))+parseInt(getStyle(pigWrap, 'height'))/2-foodPos[i][1])<50){
			food[i].style.transitionDuration = '0s';
			food[i].style.right = '40px';
			food[i].style.bottom = '20px';
			foodPos.splice(i, 1, undefined);

			var getFat = parseInt(Math.random() * 20)+5;
			pig.style.fontSize = parseInt(getStyle(pig, 'font-size')) + getFat + 'px';
			if(parseInt(pig.style.fontSize) > flyWeight) {
				pigFly();
			}
			
		}
	}
}


// tools
function getStyle(elem, prop) {
	if(window.getComputedStyle) {
		return window.getComputedStyle(elem, null)[prop];
	}else{
		return elem.currentStyle[prop];
	}
}

function getViewportOffset() {
	if(window.innerWidth) {
		return {
			w: window.innerWidth,
			h: window.innerHeight
		}
	}else{
		if(document.compatMode === "BackCompat") {
			return {
				w: document.body.clientWidth,
				h: document.body.clientHeight
			}
		}else{
			return {
				w: document.documentElement.clientWidth,
				h: document.documentElement.clientHeight
			}
		}
	}
}
