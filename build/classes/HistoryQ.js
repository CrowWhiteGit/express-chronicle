"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HistoryQ {
    constructor(capacity, importantCapacity) {
        this.write = (item) => {
            if (this.items.length >= this.capacity) {
                this.items.pop();
            }
            this.items.unshift(item);
        };
        this.writeImportant = (item) => {
            if (this.importantItems.length >= this.importantCapacity) {
                this.importantItems.pop();
            }
            this.importantItems.unshift(item);
        };
        this.get = (limit = null, offset = 0) => {
            let output = JSON.parse(JSON.stringify(this.items));
            let _limit = !!limit ? limit : this.capacity - offset;
            return output.slice(offset, _limit + offset);
        };
        this.getImportant = (limit = null, offset = 0) => {
            let output = JSON.parse(JSON.stringify(this.importantItems));
            let _limit = !!limit ? limit : this.importantCapacity - offset;
            return output.slice(offset, _limit + offset);
        };
        this.capacity = capacity;
        this.importantCapacity = importantCapacity;
        this.items = [];
        this.importantItems = [];
    }
}
exports.default = HistoryQ;
//# sourceMappingURL=HistoryQ.js.map