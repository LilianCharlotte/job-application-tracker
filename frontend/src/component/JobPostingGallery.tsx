import {User} from "../model/User";
import JobPostingCard from "./JobPostingCard";
import {Box, Grid} from "@mui/material";

export type JobPostingGalleryProps = {
    user: User
}

export default function JobPostingGallery(props: JobPostingGalleryProps) {

    return <Grid container spacing={2} sx={{color: 'white'}}>
            <Grid item>
                <Box>
                    Interested in
                    {props.user?.jobPostings.length > 0 && props.user.jobPostings.filter(jobPosting => jobPosting.status === "INTERESTED_IN").map(
                        filteredJobPosting => <JobPostingCard jobPosting={filteredJobPosting}
                                                              key={filteredJobPosting.id}/>)
                    }
                </Box>
            </Grid>
            <Grid item>
                <Box>
                    Currently working on
                    {props.user?.jobPostings.length > 0 && props.user.jobPostings.filter(jobPosting => jobPosting.status === "CURRENTLY_WORKING_ON").map(
                        filteredJobPosting => <JobPostingCard jobPosting={filteredJobPosting}
                                                              key={filteredJobPosting.id}/>)
                    }
                </Box>
            </Grid>
        </Grid>
}
