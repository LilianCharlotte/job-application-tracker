import {JobPosting} from "../model/JobPosting";
import {Box, Button, Card, CardActions, CardContent, Link, styled, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export type JobPostingCardProps = {
    jobPosting: JobPosting

}

export default function JobPostingCard(props: JobPostingCardProps) {
    const navigate = useNavigate();

    const CardContentLessPadding = styled(CardContent)(`
  padding: 4;
  &:last-child {
    padding-bottom: 0;
  }
`);

    function viewJobPostingDetails() {
        navigate('/details', {state: {jobPosting: props.jobPosting}});
    }

    return (
        <Typography component={"div"} textAlign={"center"}>
            <Card sx={{m: '0.5rem', maxWidth: 245, transform: 'scale(0.9)'}} variant="outlined">
                <CardContentLessPadding>
                    <Typography component={"div"} sx={{fontSize: 10}} color="text.secondary" textAlign="left"
                                gutterBottom>
                        JobPosting
                    </Typography>
                    <Typography component={"div"} sx={{fontSize: 18}} variant="h5">
                        {props.jobPosting.companyName}
                    </Typography>
                    <Typography component={"div"} sx={{mb: 1.5, fontSize: 13}} color="text.secondary">
                        {!props.jobPosting.isUnsolicited ? props.jobPosting.jobTitle : "write an unsolicited application"}
                    </Typography>
                    <Typography component={"div"} sx={{fontSize: 11, wordWrap: "break-word"}} variant="body2">
                        <Box sx={{maxWidth: 185}}>
                            <Link href={props.jobPosting.jobPostingLink}
                                  underline="hover" color="secondary">{props.jobPosting.jobPostingLink}</Link>
                            <br/>
                            located in: {props.jobPosting.locatedAt}<br/>
                            working
                            remotely:
                            {props.jobPosting.remote === "REMOTE" && " yes"}
                            {props.jobPosting.remote === "HYBRID" && " hybrid"}
                            {props.jobPosting.remote === "IN_OFFICE" && " no"}
                        </Box>
                    </Typography>
                    <CardActions>
                        <Button onClick={viewJobPostingDetails} size="small" variant="contained">View</Button>
                    </CardActions>

                </CardContentLessPadding>
            </Card>
        </Typography>
    )
}
