
class HistoryQ {
    /**
     * 
     * @param {Number} capacity 
     */
    constructor(capacity) {
        /** @private */
        this.capacity = capacity;

        /** @private */
        this.items = [];
    }

    write = (item) => {
        if (this.items.length >= this.capacity) {
            this.items.shift();
        }
        this.items.push(item);
    }

    get(limit = null, offset = 0) {
        let output = JSON.parse(JSON.stringify(this.items));

        let _limit = !!limit ? limit : this.capacity - offset;

        return output.slice(offset, _limit + offset);
    }
}

module.exports = HistoryQ;
