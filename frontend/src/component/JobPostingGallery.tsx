import {User} from "../model/User";
import JobPostingCard from "./JobPostingCard";
import {Grid} from "@mui/material";

export type JobPostingGalleryProps = {
    user: User
}

export default function JobPostingGallery(props: JobPostingGalleryProps) {

    return <div>

        <Grid container spacing={2}>
            <Grid item>
                1
                {props.user?.jobPostings.length !== 0 && props.user.jobPostings.filter(jobPosting => jobPosting.status === "INTERESTED_IN").map(
                    filteredJobPosting => <JobPostingCard jobPosting={filteredJobPosting} key={filteredJobPosting.id}/>)
                }
            </Grid>
            <Grid item>
                2
                {props.user?.jobPostings.length !== 0 && props.user.jobPostings.filter(jobPosting => jobPosting.status === "CURRENTLY_WORKING_ON").map(
                    filteredJobPosting => <JobPostingCard jobPosting={filteredJobPosting} key={filteredJobPosting.id}/>)
                }
            </Grid>
        </Grid>
    </div>

}
