export interface WorkPlan{
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
    company: string;
    phoneNumber: string;
    dateTimeCreated?: Date;
    createdBy: string;
    workRequestId?: number;
    crewId?: number;
    incidentId?: number;
}