function generateParticles(count, arr, type) {
    for (var i = 0; i < count; i++) {
        let pos = util.randCoord(config.w, config.h);
        arr.push(newParticle({
            x: pos.x,
            y: pos.y,
            type: type,
            color: util.randomColor()
        }));
    }
}

function drawParticles() {
    particles.forEach(function(particle) {
        particle.draw(ctx);
    })
}

function render() {
    canvasUtil.blurClear(ctx);
    drawParticles();
}

function startSimulation() {
    requestAnimationFrame(simulate);
}

function simulate() {
    particles.forEach(simulateParticle);
    targets.forEach(simulateParticle);

    render();
    requestAnimationFrame(simulate);
}

function simulateParticle(particle) {
    if (!particle.target) {
        particle.setTarget(util.arrayRand(targets));
    }

    if (!particle.destination) {
        let destination = util.randCoord(config.w, config.h);
        particle.setDestination(destination);
    }

    if (!particle.vector) {
        particle.vector = vector(particle, particle.destination);
    }

    if (particle.type === 'line' && !config.movingLines) {
        return;
    }

    if (particle.type === 'target' && !config.movingTargets) {
        return;
    }
    
    if (physics.hitTest(particle, particle.destination)) {
        particle.destination = false;
        particle.vector = false;
    } else {
        physics.move(particle, particle.vector);
    }
}

function start() {
    config.h = document.body.clientHeight;
    config.w = document.body.clientWidth;

    canvas.width = config.w;
    canvas.height = config.h;

    area = config.w * config.h;
    particles = [];
    targets = [];
    particleCount = area * config.lineCount;

    generateParticles(particleCount, particles, 'line');
    generateParticles(config.targetCount, targets, 'target');

    if (!started) {
        startSimulation();
    }

    started = true;
}

let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d'),
    started = false,
    area, particleCount, particles, targets;

start();

var gui = new dat.GUI({
    autoPlace: false
});

var customContainer = document.getElementById('gui');
customContainer.appendChild(gui.domElement);

gui.add(config, 'addTarget');
gui.add(config, 'removeTarget');
gui.add(config, 'moreLines');
gui.add(config, 'lessLines');
gui.add(config, 'lineWidth').min(1).step(1);
gui.add(config, 'movingLines');
gui.add(config, 'movingTargets');
