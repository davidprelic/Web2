export interface Device {
    id?: number;
    type: string;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    incidentId?: number;
}