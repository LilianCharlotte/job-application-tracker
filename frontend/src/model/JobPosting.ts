export type ColumnStatus =
    "INTERESTED_IN"
    | "CURRENTLY_WORKING_ON"
    | "APPLICATION_SUBMITTED"
    | "INTERVIEW_SCHEDULED"
    | "DECIDING_ON_JOB_OFFERING"
export type WorkModel = "IN_OFFICE" | "REMOTE" | "HYBRID"

export type JobPosting = {
    id: string,
    companyName: string,
    isUnsolicited: boolean,
    jobTitle: string,
    jobDescription: string,
    jobPostingLink: string,
    remote: WorkModel,
    locatedAt: string,
    status: ColumnStatus,
    applicationSubmissionDate: string
}

export type JobPostingRequest = {
    companyName: string,
    isUnsolicited: boolean,
    jobTitle: string,
    jobDescription: string,
    jobPostingLink: string,
    remote: WorkModel,
    locatedAt: string,
    status: ColumnStatus,
    applicationSubmissionDate: string
}
