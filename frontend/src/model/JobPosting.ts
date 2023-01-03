export enum ColumnStatus {
    INTERESTED_IN = "INTERESTED_IN",
    CURRENTLY_WORKING_ON = "CURRENTLY_WORKING_ON"
}

export type JobPosting = {
    id: string,
    userId: string,
    companyName: string,
    isUnsolicited: boolean,
    jobTitle: string,
    jobDescription: string,
    jobPostingLink: string,
    isRemote: boolean,
    locatedAt: string,
    status: ColumnStatus
}
