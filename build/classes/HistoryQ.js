"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HistoryQ {
    constructor(capacity) {
        this.write = (item) => {
            if (this.items.length >= this.capacity) {
                this.items.shift();
            }
            this.items.push(item);
        };
        this.get = (limit = null, offset = 0) => {
            let output = JSON.parse(JSON.stringify(this.items));
            let _limit = !!limit ? limit : this.capacity - offset;
            return output.slice(offset, _limit + offset);
        };
        this.capacity = capacity;
        this.items = [];
    }
}
exports.default = HistoryQ;
//# sourceMappingURL=HistoryQ.js.map