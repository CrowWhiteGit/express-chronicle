"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Flash {
    constructor(chronicle) {
        this.request = {};
        this.response = {};
        this.setReq = (field, value) => {
            this.request[field] = JSON.parse(JSON.stringify(value));
        };
        this.setRes = (field, value) => {
            this.response[field] = JSON.parse(JSON.stringify(value));
        };
        this.process = () => {
            let timestamp = ms();
            let elapsed = timestamp - this.startTime;
            let output = {
                timestamp,
                elapsed,
                request: JSON.parse(JSON.stringify(this.request)),
                response: JSON.parse(JSON.stringify(this.response))
            };
            return output;
        };
        this.done = () => {
            let result = this.process();
            if (!!result)
                this.chronicle.write(result);
        };
        this.startTime = ms();
        this.chronicle = chronicle;
    }
}
exports.default = Flash;
function ms() {
    return (new Date()).getTime();
}
//# sourceMappingURL=Flash.js.map