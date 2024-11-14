import Matter from "matter-js";
import { clamp } from "./utils";
import p5 from "p5";
const { Bodies, World, Engine, Body } = Matter;

const engine = Engine.create();
const world = engine.world;

const [WIDTH, HEIGHT] = [600, 800];
const FRUIT_SIZE = 1.25;
const SPAWN_Y = 50;

const fruits: Fruits = [];
let currentFruit: Fruit | null = null;

interface Fruit {
  size: number;
  body: Matter.Body;
}
interface Fruits {
  [key: number]: Fruit;
}

function instantiate(body: Matter.Body[] | Matter.Body) {
  World.add(world, body instanceof Array ? body : [body]);
}

function createFruit(x: number, y: number, s?: number, solid: boolean = true): Fruit {
  const size = s ?? (Math.floor(Math.random() * 5) + 1);
  const body = Bodies.circle(x, y, (size * 4) ** FRUIT_SIZE, {
    restitution: 0.5,
    isSensor: !solid,
  });

  const fruit = { size, body };

  fruits[fruit.body.id] = fruit;
  instantiate(body);

  return fruit;
}

function removeFruit(id: number) {
  World.remove(world, fruits[id].body);
  delete fruits[id];
}

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(600, 800);
    p.frameRate(60);

    const walls = [
      Bodies.rectangle(WIDTH / 2, -25, WIDTH, 50, { isStatic: true }),
      Bodies.rectangle(WIDTH / 2, HEIGHT + 25, WIDTH, 50, { isStatic: true }),
      Bodies.rectangle(-25, HEIGHT / 2, 50, HEIGHT, { isStatic: true }),
      Bodies.rectangle(WIDTH + 25, HEIGHT / 2, 50, HEIGHT, { isStatic: true })
    ];

    instantiate(walls);

    currentFruit = createFruit(p.mouseX, SPAWN_Y, undefined, false);

    Matter.Events.on(engine, "collisionStart", event => {
      event.pairs.forEach(event => {
        const fruitA = fruits[event.bodyA.id];
        const fruitB = fruits[event.bodyB.id];

        if (!fruitA || !fruitB) return;

        if (fruitA.size == fruitB.size && !event.bodyA.isSensor && !event.bodyB.isSensor) {
          removeFruit(event.bodyA.id);
          removeFruit(event.bodyB.id);
          createFruit(event.contacts[0].vertex.x, event.contacts[0].vertex.y, fruitB.size + 1);
        }
      });
    });
  };

  p.draw = () => {
    p.background("#292828");
    p.fill(0, 0);
    p.stroke("#ebdbb2")

    Engine.update(engine);

    if (currentFruit) {
      let x;
      if (currentFruit.body.circleRadius) {
        x = clamp(p.mouseX, currentFruit.body.circleRadius, WIDTH - currentFruit.body.circleRadius);
      } else {
        x = clamp(p.mouseX, 0, WIDTH);
      }

      Body.setPosition(currentFruit.body, { x, y: SPAWN_Y });
    }

    for (let i = 0; i < world.bodies.length; i++) {
      const element = world.bodies[i];
      if (element && element.circleRadius) {
        p.ellipse(element.position.x, element.position.y, ((fruits[element.id].size * 4) ** FRUIT_SIZE) * 2);
      }
    }
  };

  p.mouseClicked = () => {
    if (!currentFruit) return;

    currentFruit.body.isSensor = false;
    currentFruit = null;
    currentFruit = createFruit(p.mouseX, SPAWN_Y, undefined, false);
  }
};

new p5(sketch);
