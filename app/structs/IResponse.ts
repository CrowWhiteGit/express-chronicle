
import { Response } from "express";

// type Send<T = Response> = (body: any) => T;

export default interface IResponse extends Response { 
    // json: (body: any) => this
};
