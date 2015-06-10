let particlePrototype = {
    x: 0,
    y: 0,
    r: 1,
    color: '#FFF',
    vector: false,
    target: false,
    destination: false,
    setVector: function(vector) {
        this.vector = vector;
    },
    setTarget: function(target) {
        this.target = target;
    },
    setDestination: function(coords) {
        this.destination = coords;
    },
    draw: function draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineWidth=config.lineWidth;
        ctx.lineTo(this.target.x, this.target.y);
        ctx.stroke();
    }
}

function newParticle(options) {
    return _.extend(Object.create(particlePrototype), options);
}
