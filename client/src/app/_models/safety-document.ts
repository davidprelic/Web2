
export interface SafetyDocument {
    id?: number;
    type: string;
    planId?: string;
    status: string;
    createdBy: string;
    crewId: number;
    details: string;
    notes: string;
    phoneNo: number;
    dateTimeCreated: Date;
    multimedia?: string;
}