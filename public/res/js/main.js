import { RESOURCE } from "../../src/engine/core/network/Resource.js";
import { GAME } from "../../src/engine/core/Game.js";

RESOURCE
    .add("char_idle", "./res/assets/char/platformChar_idle.png")
    .add("./res/assets/spritesheet/player/spritesheet.json")
    .load((resource) => {
        const game = GAME.create();
        
    });

// console.log(RESOURCE);
