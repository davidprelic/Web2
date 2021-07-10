export interface UserAccount {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    address: string;
    userRole: string;
    profilePicturePath: string;
    registrationStatus: string;
    crewId?: number;
    latitude?: number;
    longitude?: number;
}