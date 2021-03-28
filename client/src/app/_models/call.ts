import { Customer } from "./customer";
import { Reason } from "./enums";

export interface Call {
    id?: number;
    reason: Reason;
    comment: string;
    hazard: string;
    customerInfo?: Customer;
}