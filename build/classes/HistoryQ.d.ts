import IHistoryItem from "../structs/IHistoryItem";
export default class HistoryQ {
    private capacity;
    private importantCapacity;
    private items;
    private importantItems;
    constructor(capacity: number, importantCapacity: number);
    write: (item: IHistoryItem) => void;
    writeImportant: (item: IHistoryItem) => void;
    get: (limit?: number, offset?: number) => IHistoryItem[];
    getImportant: (limit?: number, offset?: number) => IHistoryItem[];
}
