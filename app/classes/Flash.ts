
import HistoryQ from "./HistoryQ";
import IHistoryItem from "../structs/IHistoryItem";
import IRuleset from "../structs/IRuleset";

export default class Flash {
    private request = {};
    private response = {};
    private startTime: number;
    private chronicle: HistoryQ;
    private ruleset: IRuleset;

    constructor(chronicle: HistoryQ, ruleset: IRuleset) {
        this.startTime = ms();
        this.chronicle = chronicle;
        this.ruleset = ruleset;
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
        let _behavior = this.ruleset.defaultBehavior;
        let _status = (this.response as any)?.status?.code || null;
        let _exceptions = this.ruleset.exceptions || [];
        for (let rule of _exceptions) {
            if (rule.statusCode === Number(_status)) _behavior = rule.behavior;
        }

        let result = this.process();
        if (!!!result) return;

        switch(_behavior) {
            case "important": {
                this.chronicle.writeImportant(result);
                break;
            }
            case "common": {
                this.chronicle.write(result);
                break;
            }
            case "ignore": {
                break;
            }
            default: {
                break;
            }
        }
    }
}

function ms() {
    return (new Date()).getTime();
}
