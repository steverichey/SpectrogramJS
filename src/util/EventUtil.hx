package util;

import js.html.Event;
import js.html.FileList;

class EventUtil
{
	/**
	 * Changes the typical "Move" notification on drag to a "Copy" notification.
	 * Untyped because Haxe doesn't recognized the dataTransfer object.
	 */
	inline static public function copyEffect(For:Event):Void
	{
		untyped For.dataTransfer.dropEffect = "copy";
	}
	
	/**
	 * Cancels event default and propagation. Necessary for drag and drop.
	 */
	inline static public function cancel(For:Event):Void
	{
		For.stopPropagation();
		For.preventDefault();
	}
	
	/**
	 * Retrieves the files from an Event's dataTransfer object.
	 * Untyped because Haxe doesn't recognized the dataTransfer object.
	 */
	inline static public function getFiles(From:Event):FileList
	{
		return untyped e.dataTransfer.files;
	}
	
	/**
	 * Retrieves the target.result for this Event, again because Haxe doesn't know it's there.
	 */
	inline static public function getResult(From:Event):String
	{
		return untyped From.target.result;
	}
}