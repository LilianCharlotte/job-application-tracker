import {JobPosting} from "./JobPosting";

export type User = {
    id : string,
    name : string,
    jobPostings : JobPosting[]
}