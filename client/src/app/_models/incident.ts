import { Call } from "./call";
import { Crew } from "./crew";
import { Device } from "./device";
import { Resolution } from "./resolution";

export interface Incident {
    id?: number;
    type: string;
    priority?: string;
    isConfirmed: string;
    status?: string;
    location: string;
    latitude?: number;
    longitude?: number;
    estimatedTimeOfTheCrewArrival?: Date;
    actualTimeOfTheCrewArrival?: Date;
    outageTime: Date;
    estimatedTimetoRestore?: Date;
    affectedCustomers?: number;
    numberOfCalls?: number;
    voltage?: number;
    scheduledTime?: Date;
    resolutionId?: number;
    crewId?: number;
}