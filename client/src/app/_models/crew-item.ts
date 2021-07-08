import { UserProfile } from "./user-profile";

export interface CrewItem {
    id: number;
    name: string;
    members?: UserProfile[];
}