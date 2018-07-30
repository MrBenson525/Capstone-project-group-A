// Subclass for brush functionality of canvas
class DrawLine extends CanvasCommon{
	constructor(){
		super();
		this.leftOffset = null;
		this.topOffset = null;
		this.pp = [-1, -1];
		this.np = [0, 0];
	}
	onMouseDown(){
		this.leftOffset =  $('#canvas')[0].offsetLeft;
		this.topOffset = $('#canvas')[0].offsetTop;
		ctxReal.strokeStyle = color.val();
		ctxReal.lineWidth = thickness.val();
	}
	onMouseDragging(e){
		if(this.pp[0] == -1 && this.pp[1] == -1 ){
			this.pp = [e.pageX - this.leftOffset, e.pageY - this.topOffset];
		}
		this.np = [e.pageX - this.leftOffset, e.pageY - this.topOffset];
		ctxReal.beginPath();
		ctxReal.moveTo(this.pp[0], this.pp[1]);
		ctxReal.lineTo(this.np[0], this.np[1]);
		ctxReal.closePath();
		ctxReal.stroke();
		this.pp[0] = this.np[0];
		this.pp[1] = this.np[1];	
	}
	onMouseUp(){
		this.pp = [-1, -1];
		cPush();
	}
}