
export interface HistorySafetyDoc {
    id?: number;
    changedFrom: string;
    changedTo: string;
    dateTimeChanged?: Date;
    userId?: number;
    safetyDocumentId?: number;
}