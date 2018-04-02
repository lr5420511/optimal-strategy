"use strict";

const assert = require("assert");

const Map = module.exports = function(source, exit) {
    this.src = source;
    assert(this.isVaild(exit), "exit is invaild.");
    this.exit = exit;
};

Map.prototype = {
    constructor: Map,
    isVaild: function(point) {
        const xPoint = this.src[point.x];
        return xPoint ? xPoint[point.y] : xPoint;
    },
    getRounds: function(point) {
        return [
            { x: point.x - 1, y: point.y },
            { x: point.x + 1, y: point.y },
            { x: point.x, y: point.y - 1 },
            { x: point.x, y: point.y + 1 }
        ].filter((cur) => {
            return this.isVaild(cur);
        });
    },
    isExit: function(point) {
        return point.x === this.exit.x &&
            point.y === this.exit.y;
    }
};

Map.computeCoor = function(fir, sec) {
    return {
        x: sec.x - fir.x,
        y: sec.y - fir.y
    };
};