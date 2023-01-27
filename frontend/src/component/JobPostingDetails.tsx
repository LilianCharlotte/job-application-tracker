import {useLocation, useNavigate} from "react-router-dom";
import {Box, Button, Card, CardContent, Divider, Link, Menu, MenuItem, Typography} from "@mui/material";
import React, {MouseEvent, MouseEventHandler, useState} from "react";
import {ColumnStatus} from "../model/JobPosting";
import {theme} from "../App";
import * as sanitizeHtml from 'sanitize-html';

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

    function otherStatusesThanCurrent(): Array<ColumnStatus> {
        switch (jobPosting.status) {
            case "INTERESTED_IN":
                return ["CURRENTLY_WORKING_ON", "APPLICATION_SUBMITTED"];
            case "CURRENTLY_WORKING_ON":
                return ["INTERESTED_IN", "APPLICATION_SUBMITTED"];
            case "APPLICATION_SUBMITTED":
                return ["INTERVIEW_SCHEDULED", "DECIDING_ON_JOB_OFFERING"];
            case "INTERVIEW_SCHEDULED":
                return ["DECIDING_ON_JOB_OFFERING"];
            case "DECIDING_ON_JOB_OFFERING":
                return [];
            default:
                throw new Error("Invalid move options");
        }
    }

    function mapColumnStatusToText(columnStatus: ColumnStatus) {
        switch (columnStatus) {
            case "INTERESTED_IN":
                return "Interested in";
            case "CURRENTLY_WORKING_ON":
                return "Currently working on";
            case "APPLICATION_SUBMITTED":
                return "Application submitted";
            case "INTERVIEW_SCHEDULED":
                return "Interview scheduled";
            case "DECIDING_ON_JOB_OFFERING":
                return "Deciding on job offering";

        }
    }

    function moveJobPosting(toColumnStatus: ColumnStatus): MouseEventHandler {
        return function handleMove(event: MouseEvent<HTMLDivElement>) {
            event.preventDefault()
            if (toColumnStatus === "APPLICATION_SUBMITTED") {
                navigate('/moveToSubmitted', {state: {jobPosting: jobPosting}});
                return;
            }
            props.handleMoveJobPosting(jobPosting.id, toColumnStatus);
            navigate("/");
        }
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
                    <Box component="div" sx={{maxWidth: '500px'}}>
                        <Typography variant="h3" gutterBottom sx={{color: theme.palette.primary.main}}>
                            Details
                        </Typography>

                        <Typography sx={{fontSize: '1.2rem'}}>
                            Company name: &ensp;
                            {jobPosting.companyName} <Divider/>
                            {jobPosting.isUnsolicited ? <>{"Write an unsolicited application."}<Divider/> </> : <>
                                {"Job title: "}&ensp;{jobPosting.jobTitle}<Divider/> </>}
                            {!jobPosting.isUnsolicited && <>{"Job description: "}&emsp;{jobPosting.jobDescription}<Divider/></>}

                            <Link href={jobPosting.jobPostingLink}
                                  underline="hover" color="secondary">{jobPosting.jobPostingLink}</Link>
                            <Divider/>

                            Located in:&ensp; {jobPosting.locatedAt} <Divider/>

                            Working remotely:&ensp; {jobPosting.remote === "REMOTE" && "yes"}
                            {jobPosting.remote === "IN_OFFICE" && "In office only"}
                            {jobPosting.remote === "HYBRID" && "hybrid"} <Divider/>

                            {jobPosting.status === "APPLICATION_SUBMITTED" && <>{"Application submission date: "}
                                {new Date(jobPosting.applicationSubmissionDate).toLocaleString()}h <Divider/></>}
                        </Typography>
                        {jobPosting.status === "APPLICATION_SUBMITTED" && <>
                            <div
                                dangerouslySetInnerHTML={{__html: sanitizeHtml.default(jobPosting.notes)}}></div>
                            <Divider/></>
                        }
                    </Box>
                </CardContent>
                <Box/>
                <CardContent sx={{width: 51}}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        {otherStatusesThanCurrent().length !== 0 &&
                            <Button size="small" variant="contained" sx={{mb: '0.2rem'}}
                                    onClick={handleOpenPopover}>move</Button>}
                        <Menu
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
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
                            {otherStatusesThanCurrent().map(item => {
                                return <MenuItem key={item} onClick={moveJobPosting(item)}>move to
                                    '{mapColumnStatusToText(item)}'</MenuItem>
                            })}
                        </Menu>
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
