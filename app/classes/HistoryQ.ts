
import IHistoryItem from "../structs/IHistoryItem";

export default class HistoryQ {
    private capacity: number;
    private items: Array<IHistoryItem>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.items = [];
    }

    write = (item: IHistoryItem) => {
        if (this.items.length >= this.capacity) {
            this.items.shift();
        }
        this.items.push(item);
    }

    get = (limit: number = null, offset: number = 0) => {
        let output: Array<IHistoryItem> = JSON.parse(JSON.stringify(this.items));

        let _limit = !!limit ? limit : this.capacity - offset;

        return output.slice(offset, _limit + offset);
    }
}
