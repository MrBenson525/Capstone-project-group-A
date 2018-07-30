// Subclass for curve drawing functionality of canvas
class Curve extends CanvasCommon{
	constructor(){
		super();
		this.leftOffset = null;
		this.topOffset = null;
		// The editing curve variable determines whether the curve is in drawing phase or editing phase
		this.editingCurve = false; 
		this.starting = [0, 0];
		this.ending = [0, 0];
		this.curvePivot = [0, 0];
	}
	onMouseDown(e){
		if(this.editingCurve){
			this.leftOffset = $('#canvas-draft')[0].offsetLeft;
			this.topOffset = $('#canvas-draft')[0].offsetTop;
			ctx.strokeStyle = color.val();
			ctx.lineWidth = thickness.val();
			ctxReal.strokeStyle = color.val();
			ctxReal.lineWidth = thickness.val();
			ctx.beginPath();
			ctx.moveTo(this.starting[0], this.starting[1]);
			ctx.quadraticCurveTo(this.starting[0], this.starting[1], this.ending[0], this.ending[1]);
			ctx.stroke();
		} else {
			this.leftOffset = $('#canvas-draft')[0].offsetLeft;
			this.topOffset = $('#canvas-draft')[0].offsetTop;
			ctx.strokeStyle = color.val();
			ctx.lineWidth = thickness.val();
			ctxReal.strokeStyle = color.val();
			ctxReal.lineWidth = thickness.val();
			this.starting = [e.pageX - this.leftOffset, e.pageY - this.topOffset];
		}
	}
	onMouseDragging(e){
		if(this.editingCurve){
			ctx.clearRect(0, 0, canvas.width(), canvas.height());
			this.curvePivot = [e.pageX - this.leftOffset, e.pageY - this.topOffset];
			ctx.beginPath();
			ctx.moveTo(this.starting[0], this.starting[1]);
			ctx.quadraticCurveTo(this.curvePivot[0], this.curvePivot[1], this.ending[0], this.ending[1]);
			ctx.stroke();
		} else {
			ctx.clearRect(0, 0, canvas.width(), canvas.height());
			this.ending = [e.pageX - this.leftOffset, e.pageY - this.topOffset];
			ctx.beginPath();
			ctx.moveTo(this.starting[0], this.starting[1]);
			ctx.lineTo(this.ending[0], this.ending[1]);
			ctx.stroke();
		}
	}
	onMouseUp(e){
		if(this.editingCurve){
			ctx.clearRect(0, 0, canvas.width(), canvas.height());
			ctxReal.beginPath();
			ctxReal.moveTo(this.starting[0], this.starting[1]);
			ctxReal.quadraticCurveTo(this.curvePivot[0], this.curvePivot[1], this.ending[0], this.ending[1]);
			ctxReal.stroke();
			cPush();
			this.editingCurve = false;
			this.starting = [0, 0];
			this.ending = [0, 0];
			this.curvePivot = [0, 0];
		} else {	
			this.editingCurve = true;		
		}
	}	
}