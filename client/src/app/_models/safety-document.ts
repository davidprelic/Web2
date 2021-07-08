
export interface SafetyDocument {
    id?: number;
    type: string;
    status: string;
    createdBy: string;
    details: string;
    notes: string;
    phoneNumber: number;
    dateTimeCreated: Date;
    workPlanId?: number;
    crewId?: number;
    checklistId?: number;
}