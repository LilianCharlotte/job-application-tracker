import {useLocation} from "react-router-dom";
import {Box, Button, Card, CardContent, Link, Typography} from "@mui/material";


export default function JobPostingDetails() {
    const {state} = useLocation();
    const {jobPosting} = state;


    return (
        <Card sx={{display: 'flex', ml:'15rem', mr:"15rem"}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography sx={{fontSize: 10}} color="text.secondary" textAlign="left" gutterBottom>
                        Id: {jobPosting.id}
                    </Typography>
                    <Box component="div" sx={{maxWidth:'500px'}}>
                        Company name: {jobPosting.companyName} <br/>
                        {jobPosting.isUnsolicited ? "Write an unsolicited application." : "Job title: " + jobPosting.jobTitle}
                        <br/>
                        Job description: {jobPosting.jobDescription} <br/>
                        Link: <Link href={jobPosting.jobPostingLink}
                                    underline="hover" color="secondary">{jobPosting.jobPostingLink}</Link> <br/>
                        Located in: {jobPosting.locatedAt} <br/>
                        Working remotely: {jobPosting.isRemote ? "yes" : "no"} <br/>
                    </Box>
                </CardContent>
                <Box/>
                <CardContent sx={{width:51}}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Button size="small" variant="contained" sx={{mb:'0.2rem'}}>edit</Button>
                        <Button size="small" variant="contained" sx={{mb:'0.2rem'}}>move</Button>
                        <Button size="small" variant="contained" sx={{mb:'0.2rem'}}>delete</Button>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    )
}
