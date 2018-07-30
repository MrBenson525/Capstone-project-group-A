// Subclass for rectangle drawing functionality of canvas
class DrawRect extends CanvasCommon{
	constructor(){
		super();
		this.leftOffset = null;
		this.topOffset = null;
		this.rectStart = [0,0];
		this.rectFinish = [0,0];
		this.rectStart = [0,0];
		this.rectFinish = [0,0];
	}
	onMouseDown(e){
		this.leftOffset =  $('#canvas-draft')[0].offsetLeft;
		this.topOffset = $('#canvas-draft')[0].offsetTop;
		ctx.strokeStyle = color.val();
		ctx.lineWidth = thickness.val();
		ctxReal.strokeStyle = color.val();
		ctxReal.lineWidth = thickness.val();
		this.rectStart = [e.pageX - this.leftOffset, e.pageY - this.topOffset];
	}
	onMouseDragging(e){
		ctx.clearRect(0, 0, canvas.width(), canvas.height());
		ctx.beginPath();
		this.rectFinish = [e.pageX - this.leftOffset,  e.pageY - this.topOffset];
		ctx.rect(this.rectStart[0],this.rectStart[1],this.rectFinish[0] - this.rectStart[0],this.rectFinish[1] - this.rectStart[1]);
		ctx.stroke();
	}
	onMouseUp(){
		ctx.clearRect(0, 0, canvas.width(), canvas.height());
		ctxReal.beginPath();
		ctxReal.rect(this.rectStart[0],this.rectStart[1],this.rectFinish[0] - this.rectStart[0],this.rectFinish[1] - this.rectStart[1]);
		ctxReal.stroke();
		cPush();	
	}
}