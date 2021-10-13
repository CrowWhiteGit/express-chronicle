import HistoryQ from "./HistoryQ";
import IRuleset from "../structs/IRuleset";
export default class Flash {
    private request;
    private response;
    private startTime;
    private chronicle;
    private ruleset;
    constructor(chronicle: HistoryQ, ruleset: IRuleset);
    setReq: (field: string, value: any) => void;
    setRes: (field: string, value: any) => void;
    private process;
    done: () => void;
}
