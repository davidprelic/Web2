import { Call } from "./call";
import { Crew } from "./crew";
import { Device } from "./device";
import { Resolution } from "./resolution";

export interface Incident {
    id?: number;
    type: string;
    priority?: string;
    confirmed: string;
    status: string;
    estimatedTimeOfTheCrewArrival: Date;
    actualTimeOfTheCrewArrival?: Date;
    outageTime: Date;
    estimatedTimetoRestore: Date;
    affectedCustomers?: number;
    numberOfCalls: number;
    voltage: number;
    scheduledTime: Date;
    devices?: Device[];
    resolution?: Resolution;
    calls: Call[];
    crew: Crew;
    multimedia?: string;
}