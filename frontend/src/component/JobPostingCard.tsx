import {JobPosting} from "../model/JobPosting";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";

export type JobPostingCardProps = {
    jobPosting: JobPosting
}

export default function JobPostingCard(props: JobPostingCardProps) {


    return (<Box m={2}>
        <Card sx={{ minWidth: 275, maxWidth: 300 }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" textAlign="left" gutterBottom>
           JobPosting
            </Typography>
            <Typography variant="h5" component="div">
                {props.jobPosting.companyName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {!props.jobPosting.isUnsolicited? props.jobPosting.jobTitle : "write an unsolicited application"}
            </Typography>
            <Typography variant="body2">
                <a href={props.jobPosting.jobPostingLink}>{props.jobPosting.jobPostingLink}</a> <br/>
                located in: {props.jobPosting.locatedAt}<br/>
                work from home: {props.jobPosting.isRemote? "yes" : "no"}<br/>
            </Typography>
            <CardActions>
                <Button size="small">View</Button>
            </CardActions>

        </CardContent>
        </Card>
    </Box>)
}