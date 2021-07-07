
export interface SafetyDocument {
    id?: number;
    type: string;
    status: string;
    createdBy: string;
    details: string;
    notes: string;
    phoneNumber: number;
    dateTimeCreated: Date;
    workPlanId?: string;
    crewId: number;
    checklistId: number;
}