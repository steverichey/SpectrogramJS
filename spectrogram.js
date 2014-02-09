/*global console*/
/*global window*/
/*global document*/
/*global alert*/
/*global Image*/
/*global FileReader*/

/**
 * A reference to the document canvas.
 */
var canvas;
/**
 * A reference to the document canvas context.
 */
var ctx;
/**
 * An image we can use later to draw to the canvas.
 */
var image = new Image();
/**
 * The maximum height to display the dropped image.
 */
var MAX_HEIGHT = 100;

/**
 * Scales the image size to the maximum height.
 */
function setImageSize(thisImage) {
    'use strict';
    if (thisImage.height > MAX_HEIGHT) {
        thisImage.width *= MAX_HEIGHT / image.height;
        thisImage.height = MAX_HEIGHT;
    }
}

/**
 * Shows the dropped image in the canvas.
 */
function render(src) {
    'use strict';
    
    image.src = src;
	image.onload = setImageSize(image);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = image.width;
	canvas.height = image.height;
	ctx.drawImage(image, 0, 0, image.width, image.height);
}

/**
 * Render the result of an event.
 */
function renderResult(event) {
    'use strict';
    render(event.target.result);
}

/**
 * Loads an image from a specified source.
 */
function loadImage(src) {
    'use strict';
    
    if (!src.type.match(/image*/)) {
        alert("The dropped file is not an image! It's a " + src.type);
        return;
    }
    
    var reader = new FileReader();
    reader.onload = renderResult;
    reader.readAsDataURL(src);
}

/**
 * Simple wrapper for preventDefault.
 */
function preventDefault(event) {
    'use strict';
    event.preventDefault();
}

/**
 * Get the image from a drop event on the canvas.
 */
function prepLoadImage(event) {
    'use strict';
    preventDefault(event);
    loadImage(event.dataTransfer.files[0]);
}

/**
 * Initialize canvas and context variables.
 */
function init() {
    'use strict';
    
    canvas = document.getElementById('spectrogramcanvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener("dragover", preventDefault, true);
    canvas.addEventListener("drop", prepLoadImage, true);
}

window.onload = init;