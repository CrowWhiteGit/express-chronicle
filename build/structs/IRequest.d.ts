import Flash from "../classes/Flash";
import { Request } from "express";
export default interface IRequest extends Request {
    flash?: Flash;
}
