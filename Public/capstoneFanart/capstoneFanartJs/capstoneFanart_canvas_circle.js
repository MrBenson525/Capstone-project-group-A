// Subclass for circle drawing functionality of canvas
class DrawCircle extends CanvasCommon{
	constructor(){
		super();
		this.leftOffset = null;
		this.topOffset = null;
		this.center = [0,0]
		this.radius = 0;
	}
	onMouseDown(e){
		this.leftOffset =  $('#canvas-draft')[0].offsetLeft;
		this.topOffset = $('#canvas-draft')[0].offsetTop;
		ctx.strokeStyle = color.val();
		ctx.lineWidth = thickness.val();
		ctxReal.strokeStyle = color.val();
		ctxReal.lineWidth = thickness.val();
		this.center = [e.pageX - this.leftOffset, e.pageY - this.topOffset];
	}
	onMouseDragging(e){
		ctx.clearRect(0, 0, canvas.width(), canvas.height());
		var current = [e.pageX - this.leftOffset,  e.pageY - this.topOffset];
		this.radius = Math.max(Math.abs(current[0] - this.center[0]), Math.abs(current[1] - this.center[1]))
		ctx.beginPath();
		ctx.arc(this.center[0]+this.radius/2, this.center[1]+this.radius/2, this.radius/2, 0, 2*Math.PI);
		ctx.stroke();
	}
	onMouseUp(){
		ctx.clearRect(0, 0, canvas.width(), canvas.height());
		ctxReal.beginPath();
		ctxReal.arc(this.center[0]+this.radius/2, this.center[1]+this.radius/2, this.radius/2, 0, 2*Math.PI);
		ctxReal.stroke();
		cPush();	
	}
}