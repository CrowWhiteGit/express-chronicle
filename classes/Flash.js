
const HistoryQ = require('./HistoryQ');

class Flash {

    /** @private */
    request = {};
    response = {};

    /**
     * 
     * @param {Function} cb 
     * @param {HistoryQ} chronicle 
     */
    constructor(cb, chronicle) {
        /** @private */
        this.startTime = ms();

        /** @private */
        this.cb = cb;

        /** @private */
        this.chronicle = chronicle;
    }

    setReq = (field, value) => {
        this.request[field] = JSON.parse(JSON.stringify(value));
    }
    setRes = (field, value) => {
        this.response[field] = JSON.parse(JSON.stringify(value));
    }

    /** @private */
    process = () => {
        let output = {};
        output.timestamp = ms();
        output.elapsed = ms() - this.startTime;
        output.request = JSON.parse(JSON.stringify(this.request));
        output.response = JSON.parse(JSON.stringify(this.response));
        return output;
    }

    done = () => {
        let data = this.process();
        let result = this.cb(data);
        if(!!result) this.chronicle.write(result);
    }
}

module.exports = Flash;

function ms() {
    return (new Date()).getTime();
}
