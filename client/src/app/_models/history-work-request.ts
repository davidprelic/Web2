export interface HistoryWorkRequest {
    id?: number;
    changedFrom: string;
    changedTo: string;
    dateTimeChanged?: Date;
    userId?: number;
    workRequestId?: number;
}