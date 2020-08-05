import { TIME } from "./Time.js";

class Game {

    constructor() {
        /**
         * @type {RenderingContext}
         */
        this.renderingContext = null;

        Object.defineProperties(this, {
            renderingContext: {
                set(renderingContext) {
                    if (!this._renderingContext)
                        this._renderingContext = renderingContext;
                },
                get() {
                    return this._renderingContext;
                }
            }
        });
    }

    create(width = 800, height = 600,
        options = {
            backgroundColor: "#fff"
        }) {
        TIME.elapsed = performance.now();
        const bodyStyle = document.body.style;
        bodyStyle.margin = "0";
        bodyStyle.padding = "0";
        bodyStyle.backgroundColor = "#000";
        bodyStyle.overflow = "hidden";
        const canvas = document.createElement("canvas");
        canvas.style.backgroundColor = options.backgroundColor;
        canvas.width = width;
        canvas.height = height;
        this.renderingContext = canvas.getContext("2d");
        document.body.appendChild(canvas);
        requestAnimationFrame((time) => {
            this.loop(time, this.renderingContext, width, height);
        });
        return this;
    }

    /**
     * 
     * @param {Number} time 
     * @param {RenderingContext} renderingContext 
     * @param {Number} width
     * @param {Number} height
     */
    loop(time, renderingContext, width, height) {
        requestAnimationFrame((time) => {
            this.loop(time, renderingContext, width, height);
        });
        renderingContext.clearRect(0, 0, width, height);
        TIME.loop(time);
    }

}

export const GAME = new Game;
