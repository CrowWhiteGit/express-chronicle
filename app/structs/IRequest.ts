
import Flash from "../classes/Flash";
import { Request } from "express";

// export default interface IRequest extends Express.Request {
//     flash?: Flash
// }

export default interface IRequest extends Request {
    flash?: Flash
}
