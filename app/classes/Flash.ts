
import HistoryQ from "./HistoryQ";
import IHistoryItem from "../structs/IHistoryItem";

export default class Flash {
    private request = {};
    private response = {};
    private startTime: number;
    private chronicle: HistoryQ;

    constructor(chronicle: HistoryQ) {
        this.startTime = ms();
        this.chronicle = chronicle;
    }

    setReq = (field: string, value: any) => {
        this.request[field] = JSON.parse(JSON.stringify(value));
    }
    setRes = (field: string, value: any) => {
        this.response[field] = JSON.parse(JSON.stringify(value));
    }

    private process = () => {
        let timestamp = ms();
        let elapsed = timestamp - this.startTime;

        let output: IHistoryItem = {
            timestamp,
            elapsed,
            request: JSON.parse(JSON.stringify(this.request)),
            response: JSON.parse(JSON.stringify(this.response))
        };

        return output;
    }

    done = () => {
        let result = this.process();
        if (!!result) this.chronicle.write(result);
    }
}

function ms() {
    return (new Date()).getTime();
}
