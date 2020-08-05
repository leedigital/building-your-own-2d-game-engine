class Resource {

    constructor() {
        /**
         * @type {Map<String, *>}
         */
        this.cache = new Map;
        /**
         * @type {{name:, url:}[]}
         */
        this.resources = [];
    }

    /**
     * 
     * @param {String} name 
     * @param {String} url 
     */
    add(name, url = "") {
        const obj = {
            name: name,
            url: name
        };
        if (arguments.length === 2) {
            obj.url = url;
        }
        this.resources.push(obj);
        return this;
    }

    get(name) {
        return this.cache.get(name);
    }

    /**
     * 
     * @param {Function} callback 
     */
    async load(callback) {
        const resources = this.resources;
        if (resources.length === 0) {
            callback(this);
        } else {
            const resource = resources.pop();
            const name = resource.name;
            /**
             * @type {String}
             */
            const url = resource.url;
            if (/\.(gif|png|jpg|jpeg)$/gi.test(url)) {
                const res = await fetch(url);
                const blob = await res.blob();
                const uri = URL.createObjectURL(blob);
                const image = new Image;
                image.onload = () => {
                    this.cache.set(name, image);
                    this.load(callback);
                };
                image.src = uri;
            } else if (/\.(json)$/gi.test(url)) {
                const res = await fetch(url);
                const json = await res.json();
                const frames = json.frames;
                const meta = json.meta;
                if (frames && meta) {
                    const imageUrl = `${url.substring(0, url.lastIndexOf('/'))}/${meta.image}`;
                    const res = await fetch(imageUrl);
                    const blob = await res.blob();
                    const uri = URL.createObjectURL(blob);
                    const image = new Image;
                    image.onload = () => {
                        for (const i in frames) {
                            const frameObject = frames[i];
                            const frame = frameObject.frame;
                            this.cache.set(i, {
                                x: frame.x,
                                y: frame.y,
                                w: frame.w,
                                h: frame.h,
                                image: image
                            });

                        }
                        this.load(callback);
                    };
                    image.src = uri;
                }

            } else if (/\.(mp3|ogg|wav)$/gi.test(url)) {

            }
        }
    }
}

export const RESOURCE = new Resource;
