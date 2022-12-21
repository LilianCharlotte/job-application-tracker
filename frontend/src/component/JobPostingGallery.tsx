import {User} from "../model/User";
import JobPostingCard from "./JobPostingCard";

export type JobPostingGalleryProps = {
    user: User
}

export default function JobPostingGallery(props: JobPostingGalleryProps) {

    return <div>
        {props.user?.jobPostings.length !== 0 && props.user.jobPostings.map(
            jobPosting => <JobPostingCard jobPosting={jobPosting} key={jobPosting.id}/>)
        }
    </div>

}
