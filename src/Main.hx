package;

import js.Browser;
import js.html.Element;
import js.html.Event;
import js.html.Image;
import js.html.ImageData;
import js.html.FileList;
import js.html.File;
import js.html.DataTransferItem;
import js.html.ImageElement;
import js.html.Audio;

import util.DomUtil;
import util.EventUtil;
import util.ImageUtil;

/**
 * SpectrogramJS created by Steve Richey (STVR).
 * Written in Haxe and exported to JavaScript.
 */
class Main
{
	private var image:Image;
	private var imageData:ImageData;
	private var files:FileList;
	private var imageFile:File;
	private var dataTransfer:DataTransferItem;
	private var imageElement:ImageElement;
	private var imagePath:String = "";
	private var audio:Audio;
	private var outputImage:Image;
	
	/**
	 * Mostly instantiates variables and gets thing ready for the user.
	 */
	public function new()
	{
		Global.window = Browser.window;
		Global.document = Browser.document;
		Global.body = DomUtil.getBody(Global.document);
		Global.canvas = Global.document.createCanvasElement();
		Global.context = Global.canvas.getContext2d();
		
		Global.body.appendChild(Global.canvas);
		
		onResize();
		
		Global.window.onresize = onResize;
		Global.window.ondragover = onDragOver;
		Global.window.ondragleave = onDragLeave;
		Global.window.ondrop = onDrop;
	}
	
	private function onResize(?e:Event):Void
	{
		Global.canvas.width = Global.window.innerWidth;
		Global.canvas.height = Global.window.innerHeight;
		
		Global.context.fillStyle = "#6B007F";
		Global.context.fillRect(0, 0, Global.canvas.width, Global.canvas.height);
		
		Global.context.font = "2em Open Sans";
		Global.context.fillStyle = "#F51F00";
		Global.context.fillText("Drag and drop an image to convert!", 32, Global.canvas.height / 2 - 12);
	}
	
	private function onDragOver(?e:Event):Void
	{
		EventUtil.cancel(e);
		EventUtil.copyEffect(e);
	}
	
	private function onDragLeave(?e:Event):Void
	{
		EventUtil.cancel(e);
	}
	
	private function onDrop(?e:Event):Void
	{
		EventUtil.cancel(e);
		
		files = EventUtil.getFiles(e);
		imageFile = files.item(0);
		
		if (ImageUtil.isImage(imageFile))
		{
			ImageUtil.loadImage(imageFile, onImageLoad);
		}
	}
	
	private function onImageLoad(?e:Event):Void
	{
		image = new Image();
		image.src = EventUtil.getResult(e);
		
		Global.context.drawImage(image, 0, 0);
		
		imageData = ImageUtil.getImageData(image);
		
		var i:Int = 0;
		
		while (i < imageData.data.length)
		{
			trace(imageData.data[i]);
			
			i++;
		}
		
		var img = ImageUtil.imageDataToImage(imageData);
		Global.context.drawImage(img, 0, 0);
	}
	
	/**
	 * Called initially to queue functions on load.
	 */
	static private function main():Void
	{
		Browser.window.onload = create;
	}
	
	/**
	 * Creates everything!
	 */
	static private function create(?d:Dynamic):Void
	{
		var main:Main = new Main();
	}
}