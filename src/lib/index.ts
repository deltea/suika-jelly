import Matter from "matter-js";
const { Bodies, World, Engine, Render, Mouse, Body } = Matter;

const engine = Engine.create();
const world = engine.world;
let container: HTMLElement;
let render: Matter.Render;
let mouse: Matter.Mouse;
let mouseConstraint: Matter.MouseConstraint;

const [WIDTH, HEIGHT] = [600, 800];
const FRUIT_SIZE = 1.1

const fruits: Fruit[] = [];
let currentFruit: Fruit | null = null;
const style = {
  strokeStyle: "#ebdbb2",
  lineWidth: 1,
  fillStyle: "transparent"
};

interface Fruit {
  size: number;
  body: Matter.Body;
}

function instantiate(body: Matter.Body[] | Matter.Body) {
  World.add(world, body instanceof Array ? body : [body]);
}

function createFruit(x: number, y: number) {
  const size = (Math.floor(Math.random() * 5) + 1);
  const body = Bodies.circle(x, y, (size * 6) ** FRUIT_SIZE, {
    render: style,
    restitution: 0.5,
  });

  const fruit = { size, body };

  fruits.push(fruit);
  instantiate(body);
  console.log(size);
  return fruit;
}

function setup() {
  container = document.getElementById("container") ?? document.body;
  render = Render.create({
    element: container,
    engine,
    options: {
      width: WIDTH,
      height: HEIGHT,
      wireframes: false,
      background: "transparent",
      pixelRatio: 2
    }
  });

  mouse = Mouse.create(render.canvas);
  mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0,
    }
  });

  document.addEventListener("click", click);

  World.add(world, mouseConstraint);

  Render.run(render);

  const walls = [
    Bodies.rectangle(WIDTH / 2, -25, WIDTH, 50),
    Bodies.rectangle(WIDTH / 2, HEIGHT + 25, WIDTH, 50),
    Bodies.rectangle(-25, HEIGHT / 2, 50, HEIGHT),
    Bodies.rectangle(WIDTH + 25, HEIGHT / 2, 50, HEIGHT)
  ];

  walls.forEach(wall => {
    wall.isStatic = true;
    wall.render = {
      ...style,
      strokeStyle: "transparent"
    };
  });

  instantiate(walls);

  const { x, y } = mouse.absolute;
  createFruit(x, y);
  currentFruit = fruits[0];
}

let lastTime = performance.now();
function update(time: number = performance.now()) {
  const deltaTime = time - lastTime;
  lastTime = time;

  Engine.update(engine, deltaTime);

  requestAnimationFrame(update);

  if (currentFruit) {
    Body.setPosition(currentFruit.body, mouse.absolute);
  }
}

export function main() {
  setup();
  update();
}

function click(ev: MouseEvent) {
  if (ev.button === 0) {
    if (!currentFruit) return;
    currentFruit = null;
    createFruit(mouse.absolute.x, mouse.absolute.y);
    currentFruit = fruits[fruits.length - 1];
  }
}
