// Efecto "circle hatch": arcos que irradian desde puntos focales y van
// reconstruyendo la imagen como pinceladas circulares.
// Adaptado del CodePen original de girasoles al contenedor de la tarjeta.

let bg;
let fArray = [];
let hatchToggle = true;
let chatchSize = 100;

function preload() {
  // Tu foto: coloca un archivo "photo.jpg" en la raíz del proyecto.
  // Si no existe, cae de vuelta a la imagen de girasoles del CodePen.
  bg = loadImage(
    "./photo.png",
    () => {},
    () => {
      bg = loadImage("https://assets.codepen.io/9234665/sunflowers.jpeg");
    }
  );
}

function setup() {
  const holder = document.getElementById("canvas-holder");
  const w = holder.clientWidth || 400;
  const h = holder.clientHeight || 300;

  const cnv = createCanvas(w, h);
  cnv.parent("canvas-holder");
  strokeWeight(0.8);

  seedFocalPoints(600);
}

// puntos focales repartidos en diagonal (de ahí salen los arcos radiantes)
function seedFocalPoints(numFocalPoints) {
  fArray = [];
  const spacingX = width / (numFocalPoints + 1);
  const spacingY = height / (numFocalPoints + 1);
  for (let i = 1; i <= numFocalPoints; i++) {
    fArray.push(createVector(i * spacingX, i * spacingY));
  }
}

function draw() {
  if (!hatchToggle) return;
  for (let k = 0; k < 6; k++) {
    for (let j = 0; j < fArray.length; j++) {
      circleHatch(fArray[j].x, fArray[j].y);
    }
  }
}

function circleHatch(cx, cy) {
  const x = random(0, width);
  const y = random(0, height);
  const pixCol = bg.get((bg.width * x) / width, (bg.height * y) / height);
  stroke(pixCol);

  const r = dist(cx, cy, x, y);
  let theta = atan((y - cy) / (x - cx));
  const hs = min(200, chatchSize / 10);
  const d = random(PI / (hs + 10), PI / hs);
  noFill();

  if (cx >= x && cy >= y) theta += PI;
  else if (cx >= x && cy < y) theta -= PI;
  arc(cx, cy, r * 2, r * 2, theta - d, theta + d);

  chatchSize += 0.05;
}

// clic: reiniciar puntos focales y afinar los arcos
function mousePressed() {
  seedFocalPoints(20);
  chatchSize = 1;
}

// cualquier tecla: pausar/reanudar el pintado
function keyPressed() {
  hatchToggle = !hatchToggle;
}

function windowResized() {
  const holder = document.getElementById("canvas-holder");
  resizeCanvas(holder.clientWidth, holder.clientHeight);
  seedFocalPoints(600);
}
