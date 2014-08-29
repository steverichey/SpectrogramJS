(function () { "use strict";
var Global = function() { };
var HxOverrides = function() { };
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
var Main = function() {
	Global.window = window;
	Global.document = window.document;
	Global.body = Global.document.body;
	Global.canvas = Global.document.createElement("canvas");
	Global.context = Global.canvas.getContext("2d");
	Global.body.appendChild(Global.canvas);
	this.onResize();
	Global.window.onresize = $bind(this,this.onResize);
	Global.window.ondragover = $bind(this,this.onDragOver);
	Global.window.ondragleave = $bind(this,this.onDragLeave);
	Global.window.ondrop = $bind(this,this.onDrop);
};
Main.main = function() {
	window.onload = Main.create;
};
Main.create = function(d) {
	var main = new Main();
};
Main.prototype = {
	onResize: function(e) {
		Global.canvas.width = Global.window.innerWidth;
		Global.canvas.height = Global.window.innerHeight;
		Global.context.fillStyle = "#6B007F";
		Global.context.fillRect(0,0,Global.canvas.width,Global.canvas.height);
		Global.context.font = "2em Open Sans";
		Global.context.fillStyle = "#F51F00";
		Global.context.fillText("Drag and drop an image to convert!",32,Global.canvas.height / 2 - 12);
	}
	,onDragOver: function(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy";
	}
	,onDragLeave: function(e) {
		e.stopPropagation();
		e.preventDefault();
	}
	,onDrop: function(e) {
		e.stopPropagation();
		e.preventDefault();
		this.files = e.dataTransfer.files;
		this.imageFile = this.files.item(0);
		if(HxOverrides.substr(this.imageFile.type,0,5) == "image") util.ImageUtil.loadImage(this.imageFile,$bind(this,this.onImageLoad));
	}
	,onImageLoad: function(e) {
		this.image = new Image();
		this.image.src = e.target.result;
		Global.context.drawImage(this.image,0,0);
		this.imageData = util.ImageUtil.getImageData(this.image);
		var i = 0;
		while(i < this.imageData.data.length) {
			this.imageData.data[i] = Std["int"](Math.random() * 255);
			i++;
		}
		var img;
		util.ImageUtil.canvas = Global.document.createElement("canvas");
		util.ImageUtil.context = util.ImageUtil.canvas.getContext("2d");
		util.ImageUtil.context.putImageData(this.imageData,0,0);
		util.ImageUtil.image = new Image();
		util.ImageUtil.image.src = util.ImageUtil.canvas.toDataURL("image/png");
		img = util.ImageUtil.image;
		Global.context.drawImage(img,0,0);
	}
};
var Std = function() { };
Std["int"] = function(x) {
	return x | 0;
};
var util = {};
util.ImageUtil = function() { };
util.ImageUtil.loadImage = function(ImageFile,Callback) {
	util.ImageUtil.blob = ImageFile.slice(0,ImageFile.size);
	util.ImageUtil.reader = new FileReader();
	util.ImageUtil.reader.onload = Callback;
	util.ImageUtil.reader.readAsDataURL(util.ImageUtil.blob);
};
util.ImageUtil.getImageData = function(From) {
	util.ImageUtil.canvas = Global.document.createElement("canvas");
	util.ImageUtil.context = util.ImageUtil.canvas.getContext("2d");
	util.ImageUtil.context.drawImage(From,0,0);
	return util.ImageUtil.context.getImageData(0,0,From.width,From.height);
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
Main.main();
})();
