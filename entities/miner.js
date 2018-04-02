"use strict";

const assert = require("assert");

const Miner = module.exports = function(cur, map, prev = null) {
    this.current = cur;
    this.previours = prev;
    this.history = [];
    this.map = map;
};

Miner.prototype = {
    constructor: Miner,
    simulater: function(computer) {
        assert(
            computer instanceof Function,
            "computer need been function."
        );
        const points = [].slice.call(arguments, 1);
        return points.filter((cur) => {
            return this.previours === null ||
                this.previours.x !== cur.x ||
                this.previours.y !== cur.y;
        }).map((cur) => {
            const curMiner = new Miner(cur, this.map, this.current);
            curMiner.history = this.history.slice();
            curMiner.history.push(
                computer(curMiner.previours, curMiner.current)
            );
            return curMiner;
        });
    }
};