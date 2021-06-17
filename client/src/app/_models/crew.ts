import { UserProfile } from "./user-profile";

export interface Crew {
    id?: number;
    name: string;
    members: UserProfile[];
}