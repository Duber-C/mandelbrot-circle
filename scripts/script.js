document.getElementById("number").addEventListener("change", function () {
  window.number = this.value;
  drawMandelbrot();
  updateNumber();
});

document.getElementById("points").addEventListener("change", function () {
  window.points = this.value;
  drawMandelbrot();
  updateNumber();
});

// VARIABLES GLOBALES
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// antialiasing
ctx.imageSmoothingEnabled = true;
ctx.translate(0.5, 0.5);

var radius = 300;
var number = document.getElementById("number").value;
var points = document.getElementById("points").value;
var color = "#777777";

var width = document.getElementById("canvas").width;
var height = document.getElementById("canvas").height;

function drawLine(x1, y1, x2, y2, tras) {
  ctx.beginPath();
  ctx.moveTo(x1 + tras, y1 + tras);
  ctx.lineTo(x2 + tras, y2 + tras);
  ctx.stroke();
}

function drawMandelbrot() {
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = window.color;
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
  ctx.stroke();

  for (let index = 0; index < points; index++) {
    x1 = Math.cos(((2 * Math.PI) / points) * index) * radius;
    y1 = Math.sin(((2 * Math.PI) / points) * index) * radius;

    x2 = Math.cos(((2 * Math.PI) / points) * (index * number)) * radius;
    y2 = Math.sin(((2 * Math.PI) / points) * (index * number)) * radius;

    drawLine(x1, y1, x2, y2, radius);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function animateMandelbrot() {
  for (let index = 0; index < window.points; index++) {
    for (let n = 0; n < 10; n++) {
      window.number = index + n / 10;
      drawMandelbrot();
      updateNumber();
      await sleep(50);
    }
  }
}

function updateNumber() {
  document.getElementById("counter").innerText = window.number;
}
