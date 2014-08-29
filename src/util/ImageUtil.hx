package util;

import js.html.File;
import js.html.Event;
import js.html.Blob;
import js.html.FileReader;
import js.html.Image;
import js.html.ImageData;
import js.html.CanvasRenderingContext2D;
import js.html.CanvasElement;

class ImageUtil
{
	/**
	 * Simple check to see if a given File object is an image. (e.g. 'image/png', 'image/jpeg', etc)
	 */
	inline static public function isImage(ImageFile:File):Bool
	{
		return ImageFile.type.substr(0, 5) == "image";
	}
	
	/**
	 * Asynchronously load an image from a given File object. Will call Callback when done.
	 */
	inline static public function loadImage(ImageFile:File, Callback:Event->Void):Void
	{
		blob = imageFileToBlob(ImageFile);
		reader = new FileReader();
		reader.onload = Callback;
		reader.readAsDataURL(blob);
	}
	
	/**
	 * Converts an image File object to a Blob.
	 */
	inline static public function imageFileToBlob(ImageFile:File):Blob
	{
		return ImageFile.slice(0, ImageFile.size);
	}
	
	/**
	 * Retrieves the ImageData from an Image via a canvas in memory.
	 */
	inline static public function getImageData(From:Image):ImageData
	{
		canvas = Global.document.createCanvasElement();
		context = canvas.getContext2d();
		context.drawImage(From, 0, 0);
		
		return context.getImageData(0, 0, From.width, From.height);
	}
	
	/**
	 * Converts ImageData to an Image via a canvas in memory.
	 */
	inline static public function imageDataToImage(Data:ImageData):Image
	{
		canvas = Global.document.createCanvasElement();
		context = canvas.getContext2d();
		context.putImageData(Data, 0, 0);
		
		image = new Image();
		image.src = canvas.toDataURL("image/png");
		
		return image;
	}
	
	static private var blob:Blob;
	static private var reader:FileReader;
	static private var canvas:CanvasElement;
	static private var context:CanvasRenderingContext2D;
	static private var image:Image;
}