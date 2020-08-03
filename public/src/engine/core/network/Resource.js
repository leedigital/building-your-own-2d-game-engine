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
    load(callback) {
        const resources = this.resources;
        if (resources.length === 0) {
            callback(this);
        } else {
            const resource = resources.pop();
            const name = resource.name;
            const url = resource.url;
            if (/(\.gif|\.png|\.jpg|\.jpeg)$/gi.test(url)) {
                const image = new Image;
                image.onload = () => {
                    this.cache.set(name, image);
                    this.load(callback);
                };
                image.src = url;
            } else if (/(\.json)$/gi.test(url)) {

            } else if (/(\.mp3|\.ogg|\.wav)$/gi.test(url)) {

            }
        }
    }
}

export const RESOURCE = new Resource;
