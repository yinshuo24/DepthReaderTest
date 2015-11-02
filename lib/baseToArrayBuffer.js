function baseToArrayBuffer(base64){
	var binary_string = window.atob(base64);
	var len = binary_string.length;
	var bytes = new Uint8Array(len);
	for(var i=0; i<len; i++){
		bytes[i] = binary_string.charCodeAt(i);
	}
	return bytes;
}

function canvasMouseMove(event){
	var ctx = this.getContext("2d");
	var x = event.pageX-this.offsetLeft;
	var y = event.pageY-this.offsetTop;
	var data = ctx.getImageData(x,y,1,1).data;
	var rgba = "rgba("+data[0]+","+data[1]+","+data[2]+","+data[3]+")";
	this.nextSibling.textContent="("+x+","+y+")"+rgba;
}

//receive canvas dom and image dom
function handleCanvas(canvas, image){
	var ctx = canvas.getContext("2d");
	canvas.width = image.width;
	canvas.height = image.height;
	ctx.drawImage(image,0,0);
	var imagedata = decode(baseToArrayBuffer(image.src.substring(23)));
	canvas.addEventListener("mousemove",getMouseMove(imagedata));
}

function getMouseMove(imagedata){
	return function(event){
		var ctx = this.getContext("2d");
		var x = event.pageX-this.offsetLeft;
		var y = event.pageY-this.offsetTop;
		var data = ctx.getImageData(x,y,1,1).data;
		var rgba = "rgba("+data[0]+","+data[1]+","+data[2]+","+data[3]+")";
		var start = y*imagedata.width*4+x*4;
		var another = imagedata.data.slice(start,start+4);
		this.nextSibling.textContent="("+x+","+y+")"+rgba+another;
	}
}
