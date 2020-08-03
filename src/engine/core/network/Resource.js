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
    }
}

export const RESOURCE = new Resource;
