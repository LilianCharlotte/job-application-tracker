import {JobPosting} from "../model/JobPosting";
import {Button, Card, CardActions, CardContent, Link, styled, Typography} from "@mui/material";

export type JobPostingCardProps = {
    jobPosting: JobPosting
}

export default function JobPostingCard(props: JobPostingCardProps) {

    const CardContentLessPadding = styled(CardContent)(`
  padding: 4;
  &:last-child {
    padding-bottom: 0;
  }
`);


    return (
        <Card sx={{m: '0.5rem', maxWidth: 245, transform: 'scale(0.9)'}}>
            <CardContentLessPadding>
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
                    <Link href={props.jobPosting.jobPostingLink}
                          underline="hover" color="secondary">{props.jobPosting.jobPostingLink}</Link>
                    <br/>
                    located in: {props.jobPosting.locatedAt}<br/>
                    working remotely: {props.jobPosting.isRemote ? "yes" : "no"}<br/>
                </Typography>
                <CardActions>
                    <Button size="small" variant="contained">View</Button>
                </CardActions>

            </CardContentLessPadding>
        </Card>
    )
}
