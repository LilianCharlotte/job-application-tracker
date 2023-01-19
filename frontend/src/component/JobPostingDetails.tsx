import {useLocation, useNavigate} from "react-router-dom";
import {Box, Button, Card, CardContent, Link, Popover, Typography} from "@mui/material";
import {MouseEvent, useState} from "react";
import {ColumnStatus} from "../model/JobPosting";

type JobPostingDetailsProps = {
    handleMoveJobPosting(idJobPosting: string, laneToMoveTo: ColumnStatus): void
    handleDeleteJobPosting(idJobPosting: string): void;
}

export default function JobPostingDetails(props: JobPostingDetailsProps) {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {jobPosting} = state;

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleOpenPopover = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    function stringToColumnStatus(laneToMoveTo: string): ColumnStatus {
        if (laneToMoveTo === "'Interested in'") {
            return "INTERESTED_IN";
        } else if (laneToMoveTo === "'Currently working on'") {
            return "CURRENTLY_WORKING_ON";
        } else {
            throw new Error("Invalid")
        }
    }

    const laneToMoveTo = jobPosting.status === "INTERESTED_IN" ? "'Currently working on'" : "'Interested in'";

    function handleMove(event: MouseEvent<HTMLDivElement>) {
        event.preventDefault()
        props.handleMoveJobPosting(jobPosting.id, stringToColumnStatus(laneToMoveTo));
        navigate("/");
    }


    function handleDelete(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        props.handleDeleteJobPosting(jobPosting.id);
        navigate("/");
    }

    function handleEditJobPosting(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        navigate('/editJobPosting', {state: {jobPosting: jobPosting}});
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Card sx={{display: 'flex', flexDirection: 'row', padding: '2rem'}}>
                <CardContent sx={{flex: '1 0 auto', padding: 'unset'}}>
                    <Typography component={"span"} sx={{fontSize: 10}} color="text.secondary" textAlign="left"
                                gutterBottom>
                        Id: {jobPosting.id}
                    </Typography>
                    <Box component="div" sx={{maxWidth: '500px'}}>
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
                <CardContent sx={{width: 51}}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Button size="small" variant="contained" sx={{mb: '0.2rem'}}
                                onClick={handleOpenPopover}>move</Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClick={handleMove}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'center',
                                horizontal: 'left'
                            }}
                        >
                            <Typography
                                sx={{p: 1}}>move
                                to {laneToMoveTo} </Typography>
                        </Popover>
                        <Button size="small" variant="contained" sx={{mb: '0.2rem'}}
                                onClick={handleEditJobPosting}>edit</Button>
                        <Button size="small" variant="contained" sx={{mb: '0.2rem'}}
                                onClick={handleDelete}>delete</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}
