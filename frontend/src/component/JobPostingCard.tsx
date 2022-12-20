import {JobPosting} from "../model/JobPosting";

export type JobPostingCardProps = {
    jobPosting: JobPosting
}

export default function JobPostingCard(props: JobPostingCardProps) {


    return (<div>
        JobPosting
        <p>{props.jobPosting.jobPostingLink}</p>
        <p>{props.jobPosting.jobDescription}</p>
        <p>Work from home: {props.jobPosting.isRemote} </p>
    </div>)


}