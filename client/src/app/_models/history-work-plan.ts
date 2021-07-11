export interface HistoryWorkPlan{
    id?: number;
    changedFrom: string;
    changedTo: string;
    dateTimeChanged?: Date;
    userId?:number;
    workPlanId?:number;
}