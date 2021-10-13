"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Flash {
    constructor(chronicle, ruleset) {
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
            var _a, _b;
            let _behavior = this.ruleset.defaultBehavior;
            let _status = ((_b = (_a = this.response) === null || _a === void 0 ? void 0 : _a.status) === null || _b === void 0 ? void 0 : _b.code) || null;
            let _exceptions = this.ruleset.exceptions || [];
            for (let rule of _exceptions) {
                if (rule.statusCode === Number(_status))
                    _behavior = rule.behavior;
            }
            let result = this.process();
            if (!!!result)
                return;
            switch (_behavior) {
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
        };
        this.startTime = ms();
        this.chronicle = chronicle;
        this.ruleset = ruleset;
    }
}
exports.default = Flash;
function ms() {
    return (new Date()).getTime();
}
//# sourceMappingURL=Flash.js.map