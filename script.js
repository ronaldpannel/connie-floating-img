/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const connie = new Image()
connie.src = 'connie.jpeg'


let particleArray = [];
class Universe {
  constructor(moveRadius, step, position, size) {
    this.moveRadius = moveRadius;
    this.step = step;
    this.position = position;
    this.size = size;
  }
  draw() {
    let x = Math.cos(this.position) * this.moveRadius + canvas.width / 2
    let y =  Math.sin(this.position) * this.moveRadius + canvas.height / 2
    // drawStar(x, y, 16, this.size, this.size/2)
    ctx.drawImage(connie, x, y, 100, 100);
    ctx.strokeStyle = 'yellow'
    ctx.stroke()
    // ctx.beginPath();
    // ctx.fillStyle = "white";
    // ctx.strokeStyle = 'white'
    // ctx.arc(x, y, this.size, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.stroke()
    // ctx.closePath();


  }
  update() {
    this.position += this.step;
    this.draw();
  }
}
function init() {
  particleArray = [];
  for (let i = 0; i < 55; i++) {
    let moveRadius = Math.random() * canvas.width;
    let step = Math.random() * 0.002 + 0.002;
    let position = Math.random() * (Math.PI * 2);
    let size = (Math.random() * 25) + 15;
    particleArray.push(new Universe(moveRadius, step, position, size));
  }
}

function drawStar(positionX, positionY, spikes, outerRadius, innerRadius){
  let rotation = Math.PI/2 * 3
  let x = positionX
  let y = positionY
  let step = Math.PI / spikes

  ctx.beginPath()
  ctx.moveTo(positionX, positionY - outerRadius)
  for(let i = 0; i < spikes; i++){
    x = positionX + Math.cos(rotation) * outerRadius
    y = positionY + Math.sin(rotation) * outerRadius
    ctx.lineTo(x, y)
    rotation += step

    x = positionX + Math.cos(rotation) * innerRadius;
    y = positionY + Math.sin(rotation) * innerRadius;
    ctx.lineTo(x, y);
    rotation += step;
  }
  ctx.lineTo(positionX, positionY - outerRadius);
  ctx.closePath()
}

function animate() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 225, 0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
  }
  requestAnimationFrame(animate);
}
init();
animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init()
});
