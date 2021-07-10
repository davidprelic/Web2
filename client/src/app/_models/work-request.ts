export interface WorkRequest{
    id?: number;
    type: string;
    status: string;
    address: string;
    latitude?: number;
    longitude?: number;
    startDateTime?: Date;
    endDateTime?: Date;
    purpose: string;
    notes: string;
    emergencyWork: string;
    company: string;
    phoneNumber: string;
    dateTimeCreated?: Date;
    createdBy: string;
    incidentId?: number;
}