"use strict";

const Map = require("./entities/map");
const Miner = require("./entities/miner");
const assert = require("assert");

function router(map, start, exit) {
    const miner = new Miner(
        start,
        new Map(map, exit)
    );
    const curMap = miner.map;
    assert(curMap.isVaild(start), "start is invaild.");
    return (function eacher(miners) {
        let temps = miners.filter((cur) => {
            return curMap.isExit(cur.current);
        });
        if (temps.length > 0) {
            return temps.map((cur) => {
                return router.transform(cur.history);
            });
        }
        miners.forEach((cur) => {
            temps = temps.concat(
                cur.simulater(
                    Map.computeCoor,
                    ...curMap.getRounds(cur.current)
                )
            );
        });
        return eacher(temps);
    })([miner]);
}

router.transform = function(path) {
    return path.map((cur) => {
        for (const prop in router.paths) {
            const item = router.paths[prop];
            if (item.x === cur.x &&
                item.y === cur.y) {
                cur = prop;
                break;
            }
        }
        return cur;
    });
}

router.paths = {
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 }
};

console.log(router(
    [
        [1, 1, 1, 0, 1, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 0, 0, 1, 0, 1],
        [0, 1, 1, 1, 0, 0, 0, 1, 1, 1],
        [0, 1, 0, 0, 1, 1, 1, 1, 0, 1],
        [0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
        [0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
        [0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 1]
    ], { x: 0, y: 0 }, { x: 9, y: 9 }
));