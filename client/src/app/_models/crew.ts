import { User } from "./user";

export interface Crew {
    id?: number;
    name: string;
    members: User[];
}