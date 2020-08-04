import { RESOURCE } from "../../src/engine/core/network/Resource.js";

RESOURCE
    .add("char_idle", "./res/assets/char/platformChar_idle.png")
    .add("./res/assets/spritesheet/player/spritesheet.json")
    .load((resource) => {
        const canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        const context = canvas.getContext("2d");
        const frame = resource.get("platformChar_climb1.png");
        context.drawImage(
            frame.image,
            frame.x, frame.y, frame.w, frame.h,
            300, 100, 64, 64);
        context.drawImage(
            resource.get("char_idle"),
            400, 100);
    });

// console.log(RESOURCE);
