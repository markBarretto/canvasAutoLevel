//const Caman = require('caman').Caman;

let q = require('q');

const gray = [118,118,118];

let AutoLevel = function(preview, previewImage, inputElement, inputColor){
	let t = this;
	t.preview = {
		domElement: preview,
		image: previewImage
	};
	t.input = {
		domElement: inputElement,
		color: inputColor,
		files:[],
	};
	t.data = {
		image: undefined,
		filter: {red:0,green:0,blue:0}
	}
}

AutoLevel.prototype.updatePreview = function(){
	this.appendImagePreview();
}

AutoLevel.prototype.updateImage = function(data){
	let t = this;

	if(data != undefined){
		t.data.image = data;
	} else {
		data = t.data.image;
	}

	t.preview.image.src = data;
	console.log(this.data);

	Caman(t.preview.domElement, data, function () {
		this.channels(t.data.filter);
		this.render();
	})
}

AutoLevel.prototype.updateImageFromElement = function(){

	let t = this;

	let data = t.parent.data.image;
	t.parent.preview.image.src = data;

	Caman(t.parent.preview.domElement, data, function () {
		this.channels(t.parent.data.filter);
		this.render();
	})

}

AutoLevel.prototype.appendImagePreview = function(){
	let t = this;
//	let context = this.preview.domElement.getContext('2d');
//	context.clearRect(0, 0, this.preview.width, this.preview.height);

 // 	context.canvas.width  = window.innerWidth;
	
	this.processImage(this.input.files[0]).then(function(data){
		t.updateImage(data);
	})
}



AutoLevel.prototype.pickColor = function(e){
	let context = this.parent.preview.domElement.getContext('2d');
	let data = context.getImageData(e.offsetX, e.offsetY, 1, 1).data;
	console.log(data);
	let test = String(data).split(/\,/);
	//this.parent.data.filter = {red:test[0],green:test[1],blue:test[2]}
	this.parent.data.filter = {red:(gray[0]-test[0])/3,green:(gray[0]-test[1])/3,blue:(gray[2]-test[2])/3}
	
	this.parent.updateImage();
}	

AutoLevel.prototype.updateInput = function(event, parentObj){
	this.parent.input.files = this.files;
	this.parent.updatePreview();

	console.log(this.parent.input.files);
}

AutoLevel.prototype.processImage = function(file){
	let deferred = q.defer();
	let reader = new FileReader();
	reader.onload = function(readerEvt) {
		deferred.resolve(reader.result);
	};
	try{
		reader.readAsDataURL(file);
	} catch(e){
		deferred.reject(e);
	}

	return deferred.promise;
}

module.exports = AutoLevel;