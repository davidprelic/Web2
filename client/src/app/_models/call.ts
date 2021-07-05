
export interface Call {
    id?: number;
    reason: string;
    comment: string;
    hazard: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    customerId?: number;
}