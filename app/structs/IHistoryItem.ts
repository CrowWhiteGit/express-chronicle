
import IHistoryRequest from "./IHistoryRequest";
import IHistoryResponse from "./IHistoryResponse";

export default interface IHistoryItem {
    timestamp: number,
    elapsed: number,
    request: IHistoryRequest,
    response: IHistoryResponse,
}
