import {User} from "../model/User";
import JobPostingCard from "./JobPostingCard";
import {Box, Grid} from "@mui/material";

export type JobPostingGalleryProps = {
    user: User
}

export default function JobPostingGallery(props: JobPostingGalleryProps) {

    return <Grid container spacing={1} sx={{color: 'white'}}>
        <Grid item xs={2.4}>
            <Box>
                Interested in
                {props.user?.jobPostings.length > 0 && props.user.jobPostings.filter(jobPosting => jobPosting.status === "INTERESTED_IN").map(
                    filteredJobPosting => <JobPostingCard jobPosting={filteredJobPosting}
                                                          key={filteredJobPosting.id}/>)
                }
            </Box>
        </Grid>
        <Grid item xs={2.4}>
            <Box>
                Currently working on
                {props.user?.jobPostings.length > 0 && props.user.jobPostings.filter(jobPosting => jobPosting.status === "CURRENTLY_WORKING_ON").map(
                    filteredJobPosting => <JobPostingCard jobPosting={filteredJobPosting}
                                                          key={filteredJobPosting.id}/>)
                }
            </Box>
        </Grid>
        <Grid item xs={2.4}>
            <Box>
                Application submitted
                {props.user?.jobPostings.length > 0 && props.user.jobPostings.filter(jobPosting => jobPosting.status === "APPLICATION_SUBMITTED").map(
                    filteredJobPosting => <JobPostingCard jobPosting={filteredJobPosting}
                                                          key={filteredJobPosting.id}/>)
                }
            </Box>
        </Grid>
        <Grid item xs={2.4}>
            <Box>
                Interview scheduled
                {props.user?.jobPostings.length > 0 && props.user.jobPostings.filter(jobPosting => jobPosting.status === "INTERVIEW_SCHEDULED").map(
                    filteredJobPosting => <JobPostingCard jobPosting={filteredJobPosting}
                                                          key={filteredJobPosting.id}/>)
                }
            </Box>
        </Grid>
        <Grid item xs={2.4}>
            <Box>
                Deciding on job offering
                {props.user?.jobPostings.length > 0 && props.user.jobPostings.filter(jobPosting => jobPosting.status === "DECIDING_ON_JOB_OFFERING").map(
                    filteredJobPosting => <JobPostingCard jobPosting={filteredJobPosting}
                                                          key={filteredJobPosting.id}/>)
                }
            </Box>
        </Grid>
    </Grid>
}
