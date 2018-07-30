// Subclass for straight line drawing functionality of canvas
class Line extends CanvasCommon{
	constructor(){
		super();
		this.leftOffset = null;
		this.topOffset = null;
		this.starting = [0, 0];
		this.ending = [0, 0];;
	}
	onMouseDown(e){
		this.leftOffset = $('#canvas-draft')[0].offsetLeft;
		this.topOffset = $('#canvas-draft')[0].offsetTop;
		ctx.strokeStyle = color.val();
		ctx.lineWidth = thickness.val();
		ctxReal.strokeStyle = color.val();
		ctxReal.lineWidth = thickness.val();
		this.starting = [e.pageX - this.leftOffset, e.pageY - this.topOffset];
	}
	onMouseDragging(e){
		ctx.clearRect(0, 0, canvas.width(), canvas.height());
		this.ending = [e.pageX - this.leftOffset, e.pageY - this.topOffset];
		ctx.beginPath();
		ctx.moveTo(this.starting[0], this.starting[1]);
		ctx.lineTo(this.ending[0], this.ending[1]);
		ctx.stroke();
	}
	onMouseUp(e){	
		ctx.clearRect(0, 0, canvas.width(), canvas.height());
		ctxReal.beginPath();
		ctxReal.moveTo(this.starting[0], this.starting[1]);
		ctxReal.lineTo(this.ending[0], this.ending[1]);
		ctxReal.stroke();
		cPush();
	}	
}