
import IHistoryItem from "../structs/IHistoryItem";

export default class HistoryQ {
    private capacity: number;
    private importantCapacity: number;
    private items: Array<IHistoryItem>;
    private importantItems: Array<IHistoryItem>;

    constructor(capacity: number, importantCapacity: number) {
        this.capacity = capacity;
        this.importantCapacity = importantCapacity;
        this.items = [];
        this.importantItems = [];
    }

    write = (item: IHistoryItem) => {
        if (this.items.length >= this.capacity) {
            this.items.pop();
        }
        this.items.unshift(item);
    }

    writeImportant = (item: IHistoryItem) => {
        if (this.importantItems.length >= this.importantCapacity) {
            this.importantItems.pop();
        }
        this.importantItems.unshift(item);
    }

    get = (limit: number = null, offset: number = 0) => {
        let output: Array<IHistoryItem> = JSON.parse(JSON.stringify(this.items));

        let _limit = !!limit ? limit : this.capacity - offset;

        return output.slice(offset, _limit + offset);
    }

    getImportant = (limit: number = null, offset: number = 0) => {
        let output: Array<IHistoryItem> = JSON.parse(JSON.stringify(this.importantItems));

        let _limit = !!limit ? limit : this.importantCapacity - offset;

        return output.slice(offset, _limit + offset);
    }
}
