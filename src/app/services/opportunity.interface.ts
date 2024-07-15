export interface OpportunityUser {
    id: number;
    userId: number;
    userName: string;
    userEmail: string;
    userSkills: string | null;
    opportunityId: number;
    opportunityName: string;
    opportunityDescription: string;
    status: boolean;
}

export interface Opportunity {
    name: any;
    id: number;
    opportunityResponse: {
        id: number;
        name: string;
        description: string;
        date: string;
        requiredVolunteers: number;
        hours: number;
        status: boolean;
        opportunityImages: { id: number; fileName: string; imageData: string; opportunityId: number }[];
        disasterId: number;
    };
}
