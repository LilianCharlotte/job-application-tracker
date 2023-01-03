import {JobPosting} from "../model/JobPosting";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

export type JobPostingCardProps = {
    jobPosting: JobPosting
}

export default function JobPostingCard(props: JobPostingCardProps) {


    return (
        <Card sx={{m: '0.5rem', maxWidth: 245, maxHeight: 185, transform: 'scale(0.9)'}}>
            <CardContent>
                <Typography sx={{fontSize: 10}} color="text.secondary" textAlign="left" gutterBottom>
                    JobPosting
                </Typography>
                <Typography sx={{fontSize: 18}} variant="h5" component="div">
                    {props.jobPosting.companyName}
                </Typography>
                <Typography sx={{mb: 1.5, fontSize: 13}} color="text.secondary">
                    {!props.jobPosting.isUnsolicited ? props.jobPosting.jobTitle : "write an unsolicited application"}
                </Typography>
                <Typography sx={{fontSize: 11}} variant="body2">
                    <a href={props.jobPosting.jobPostingLink}>{props.jobPosting.jobPostingLink}</a> <br/>
                    located in: {props.jobPosting.locatedAt}<br/>
                    working remotely: {props.jobPosting.isRemote ? "yes" : "no"}<br/>
                </Typography>
                <CardActions>
                    <Button size="small">View</Button>
                </CardActions>

            </CardContent>
        </Card>
    )
}
