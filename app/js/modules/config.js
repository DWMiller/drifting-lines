let config = {
    h: 0,
    w: 0,
    lineCount: 0.0001, //number of particles per pixel
    targetCount: 2,
    lineWidth: 3,
    addTarget: function() {
        this.targetCount++;
        start();
    },
    removeTarget: function() {
        if (this.targetCount > 1) {
            this.targetCount--;
            start();
        }
    },
    moreLines: function() {
        this.lineCount += 0.000025
        start();
    },
    lessLines: function() {
        if (this.lineCount > 0.00005) {
            this.lineCount -= 0.000025;
            start();
        }
    }
};
