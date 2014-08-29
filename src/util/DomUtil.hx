package util;

import js.html.Document;
import js.html.DOMWindow;
import js.html.BodyElement;

class DomUtil
{
	inline static public function getBody(From:Document):BodyElement
	{
		return cast From.body;
	}
}