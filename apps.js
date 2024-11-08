// Get references to the DOM elements
const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

const penTool = document.getElementById('penTool');
const eraserTool = document.getElementById('eraserTool');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');

// Default drawing state
let drawing = false;
let currentTool = 'pen';  // 'pen' or 'eraser'
let color = '#000000';
let size = 5;

// Set up initial canvas state
canvas.width = 800;  // Set canvas width
canvas.height = 600;  // Set canvas height
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

// Event listeners for tools
penTool.addEventListener('click', () => currentTool = 'pen');
eraserTool.addEventListener('click', () => currentTool = 'eraser');

// Event listener for color picker
colorPicker.addEventListener('input', (event) => {
    color = event.target.value;
});

// Event listener for brush size input
brushSize.addEventListener('input', (event) => {
    size = event.target.value;
});

// Event listener for the canvas to draw
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Start drawing
function startDrawing(event) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

// Drawing function
function draw(event) {
    if (!drawing) return;

    ctx.lineWidth = size;
    ctx.strokeStyle = currentTool === 'pen' ? color : '#ffffff'; // Eraser uses white color

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

// Stop drawing
function stopDrawing() {
    drawing = false;
    ctx.beginPath();  // To prevent drawing lines from previous points
}

// Clear the canvas
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save the canvas image
saveButton.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'whiteboard-image.png';
    link.click();
});
