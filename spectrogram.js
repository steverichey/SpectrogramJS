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
 * Whether or not an image has been "uploaded" and stored in image.
 */
var uploaded = false;
/**
 * An array storing the values of pixels in the uploaded image.
 */
var pixelArray = [];
/**
 * The maximum height to display the dropped image.
 */
var MAX_HEIGHT = 100;

/**
 * Scales the image size to the maximum height.
 */
function setImageSize(thisImage) {
    if (thisImage.height > MAX_HEIGHT) {
        thisImage.width *= MAX_HEIGHT / image.height;
        thisImage.height = MAX_HEIGHT;
    }
}

/**
 * Shows the dropped image in the canvas.
 */
function render(src) {
    image.src = src;
	image.onload = setImageSize(image);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = image.width;
	canvas.height = image.height;
	ctx.drawImage(image, 0, 0, image.width, image.height);
    
    uploaded = true;
}

/**
 * Render the result of an event.
 */
function renderResult(event) {
    render(event.target.result);
}

/**
 * Loads an image from a specified source.
 */
function loadImage(src) {
    if (!src.type.match(/image*/)) {
        alert("The dropped file is not an image! It's a " + src.type + " file.");
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
    event.preventDefault();
}

/**
 * Get the image from a drop event on the canvas.
 */
function prepLoadImage(event) {
    preventDefault(event);
    loadImage(event.dataTransfer.files[0]);
}

/**
 * Opens a file dialog for uploading an image.
 */
function openFileDialog(event) {
    preventDefault(event);
    alert("open file");
}

function rgbaToHex(red, green, blue, alpha) {
    var color = 0;
    color += alpha << 24;
    color += red << 16;
    color += green << 8;
    color += blue;
    
    return color;
}

function storeImage(array) {
    array = [];
    var data = ctx.getImageData(0,0,canvas.width,canvas.height).data;
    var color = 0;
    var red = 0;
    var green = 0;
    var blue = 0;
    var alpha = 0;
    
    for (var yPos = 0; yPos < image.height; yPos++) {
        for (var xPos = 0; xPos < image.width; xPos++) {
            red = data[(image.width * yPos + xPos) * 4];
            green = data[(image.width * yPos + xPos) * 4 + 1];
            blue = data[(image.width * yPos + xPos) * 4 + 2];
            alpha = data[(image.width * yPos + xPos) * 4 + 3];
            
            color = rgbaToHex(red, green, blue, alpha);
            pixelArray.push(color);
        }
    }
    
    alert( pixelArray );
}

function processImage() {
    if (!uploaded) {
        alert("Hey! You have to drag an image on to the canvas first.");
    }
    
    storeImage(pixelArray);
}

/**
 * Initialize canvas and context variables.
 */
function init() {
    canvas = document.getElementById('spectrogramcanvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener("dragover", preventDefault, true);
    canvas.addEventListener("drop", prepLoadImage, true);
    //canvas.addEventListener("click", openFileDialog, true);
}

window.onload = init;