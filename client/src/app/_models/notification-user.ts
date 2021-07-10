import { ThemePalette } from "@angular/material/core";

export interface NotificationUser{
    id: number;
    type: string;
    content: string;
    dateTimeCreated: Date;
    color: ThemePalette;
    read: boolean;
}