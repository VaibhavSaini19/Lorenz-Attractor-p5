const dt = 0.001;       // 0.005
const p = 48;           // 28
const w = 25;           // 10
const beta = 20 / 3;     // 8 / 3

let x = Math.random()*500;
let y = Math.random()*500;
let z = 10;

let startPoints = [x, y, z];

function setup(){
    // frameRate(10);
    createCanvas(window.innerWidth, window.innerHeight);
    colorMode(HSB);
    noStroke();
    strokeWeight(0.8);
}

function draw(){
    translate(width/2, height/2);
    scale(5);
    background(0);

    x = map(mouseX, 0, width, -160, 160);
    y = map(mouseY, 0, height, -85, 85);

    startPoints = [];
    for(let i=0; i<5; i++){
        dx = Math.random()*7 - 7;
        dy = Math.random()*7 - 7;
        dz = Math.random()*7 - 7;
        startPoints.push([x+dx, y+dy, z+dz]);
    }
    drawChaos();
}

function drawChaos(){
    for(pt of startPoints){
        x = pt[0];
        y = pt[1];
        z = pt[2];

        let hu = 0, iters = 1000;
        // let inc = 360 / iters;
        let inc = iters / 360;
        noFill();
        for(let i=0; i<iters; i++){
            px = x;
            py = y;
            pz = z;
            x += dt * w * (y - x);
            y += dt * (x * (p - z) - y);
            z += dt * (x * y - beta * z);

            stroke(hu, 255, 255);
            hu += inc;
            if(hu > 360) hu = 0;
            
            curve(px, py, px, py, x, y, x, y);

        }
    }
}
