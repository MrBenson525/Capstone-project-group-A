// JS code for all toolbar functionalities of canvas
var canvas = $('#canvas-draft');
var ctx = canvas[0].getContext("2d");
var canvasReal = $('#canvas');
var ctxReal = canvasReal[0].getContext("2d")
var dot = $('#dot');
var del = $('#clearBtn');
var dlBtn = $('#downloadBtn');
// Variables for aesthetics
var color = $('#colorPicker');
var thickness = $('#thickness');
console.log(del);
del.click(function(){
	ctxReal.clearRect(0, 0, canvas.width(), canvas.height());
})
$('#option-form').submit(function(e){
	setBackgroundImage();
})
// function downloadCanvas(link, canvasId, filename){
// 	link.href = document.getElementById(canvasId).toDataURL();
// 	link.download = filename;
// }
// dlBtn.click(function(e){
// 	downloadCanvas(this, 'canvas', 'test.png');
// })
function changeDot(){
	dot[0].style.height = thickness.val()*2 + "px";
	dot[0].style.width = thickness.val()*2 + "px";
}
var cPushArray = new Array();
var cStep = -1;
cPush();
function cPush(){
	cStep++;
	if (cStep < cPushArray.length){cPushArray.length = cStep;}
	cPushArray.push(document.getElementById("canvas").toDataURL("image/png"));
}
function cUndo(){
	if(cStep > 0){
		cStep--;		
		var canvasPic = new Image();
		canvasPic.src = cPushArray[cStep];
		ctxReal.clearRect(0, 0, canvas.width(), canvas.height())
		canvasPic.onload = function(){
			ctxReal.drawImage(canvasPic, 0, 0);
		}
	}
}
function cRedo(){
	if(cStep < cPushArray.length - 1){
		cStep++;
		ctxReal.clearRect(0, 0, canvas.width(), canvas.height())
		var canvasPic = new Image();
		canvasPic.src = cPushArray[cStep];
		canvasPic.onload = function(){
			ctxReal.drawImage(canvasPic, 0, 0);
		}
	}
}
function addColor(){
	var savedColor = color.val();
	var item = document.createElement("button");
	item.setAttribute("data-color", savedColor);
	item.style.backgroundColor = savedColor;
	item.style.width = "20px";
	item.style.height = "20px";
	item.style.margin = "1.6vh";
	item.style.borderRadius = "10px";
	item.style.border = "solid 1px white";
	$(item).click(function(){
		color.val(this.dataset.color);
	})
	$('#colorPlate').append(item);
}
function setBackgroundImage(image){
	$('#canvas').css("background", "url(image)");
}

// Changing current object upon clicking radio button
$('input[type=radio]').click(function(e){
	if(this.id == "brush"){
		currentFunction = new DrawLine();
	}
	if(this.id == "rect"){
		currentFunction = new DrawRect();
	}
	if(this.id == "circle"){
		currentFunction = new DrawCircle();
	}
	if(this.id == "line"){
		currentFunction = new Line();
	}
	if(this.id == "curve"){
		currentFunction = new Curve();
	}
	if(this.id == "eraser"){
		currentFunction = new Eraser();
	}
})
var currentFunction = new DrawLine();
var dragging = false;
canvas.mousedown(function(e){
	dragging = true;
	currentFunction.onMouseDown(e);
})
canvas.mousemove(function(e){
	if(dragging == true){
		currentFunction.onMouseDragging(e);
	}
})
canvas.mouseup(function(e){
	dragging = false;
	currentFunction.onMouseUp(e);
})

$('#option-form > label > input[type="radio"]').click(function(e){
	$(this).parent('label').addClass("selected-radio");
	console.log($(this).parent().siblings())
	$(this).parent().siblings().removeClass("selected-radio");
})

