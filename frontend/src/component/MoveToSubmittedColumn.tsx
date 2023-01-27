import React, {ChangeEvent, MouseEvent, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import {theme} from "../App";
import {useLocation, useNavigate} from "react-router-dom";
import {JobPostingRequest} from "../model/JobPosting";

type MoveToSubmittedColumnProps = {
    handleAddApplicationSubmissionDate(jobPostingId: string, jobPostingRequest: JobPostingRequest): void,
    handleUploadApplication(jobPostingId: string, pdf: File): void
}

export default function MoveToSubmittedColumn(props: MoveToSubmittedColumnProps) {
    const [value, setValue] = useState(`
        <h3>Notes</h3>
        <br/>
        <h3>Questions</h3>
    `);
    const [date, setDate] = useState<Dayjs | null>();
    const [file, setFile] = useState<File>();
    const navigate = useNavigate();
    const {state} = useLocation();
    const {jobPosting} = state;

    function dateToString() {
        if (date) {
            return date.toISOString();
        } else return "fehler"
    }

    function handleUploadAndSave(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const jobPostingRequest: JobPostingRequest = {
            companyName: jobPosting.companyName,
            isUnsolicited: jobPosting.isUnsolicited,
            jobTitle: jobPosting.jobTitle,
            jobDescription: jobPosting.jobDescription,
            jobPostingLink: jobPosting.jobPostingLink,
            remote: jobPosting.remote,
            locatedAt: jobPosting.locatedAt,
            status: "APPLICATION_SUBMITTED",
            applicationSubmissionDate: dateToString(),
            notes: value
        }
        props.handleAddApplicationSubmissionDate(jobPosting.id, jobPostingRequest);
        if (file) {
            props.handleUploadApplication(jobPosting.id, file)
        }
        navigate("/");
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    }

    return <Paper
        sx={{display: "flex", alignItems: 'center', flexDirection: 'column', maxWidth: '620px', margin: 'auto'}}>
        <Typography variant="h3" gutterBottom
                    sx={{
                        color: theme.palette.primary.main,
                        p: '1rem',
                        ml: '1rem',
                        textAlign: 'left',
                        width: '100%',
                        fontSize: '3rem'
                    }}>
            Move job posting to<br/> 'Application submitted'
        </Typography>
        <Grid container>
            <Grid item xs={5} sx={{m: '1rem', width: '100%', fontSize: '1.2rem'}}>
                1. When did you submit your application?
            </Grid>
            <Grid item xs={5} sx={{m: '1rem'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Date of submission"
                        value={date}
                        inputFormat="DD.MM.YYYY HH:mm"
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                    />
                </LocalizationProvider>
            </Grid>

            <Grid item xs={5} sx={{m: '1rem', width: '100%', fontSize: '1.2rem'}}>
                2. Upload your application: </Grid>

            <Grid item xs={5} sx={{m: '1rem'}}>
                <input style={{display: "none"}} id="file-upload" type="file" accept="application/pdf"
                       onChange={handleFileChange}/>
                <label htmlFor="file-upload">
                    <Button variant="contained" component="span" sx={{m: '0.2rem', mb: '0.8rem'}}>
                        Choose File
                    </Button>
                </label>
                <div>{file && `${file.name}`}</div>
            </Grid>

            <Grid item xs={5} sx={{m: '1rem', width: '100%', fontSize: '1.2rem'}}>
                3. Notes: </Grid>
            <Grid item xs={5} sx={{m: '1rem'}}>
                Some space for notes about the company and for questions for your future interview. ⬇️
            </Grid>

            <Grid item xs={12} sx={{m: '1rem'}}>
                <div style={{
                    backgroundColor: 'white',
                    color: "black",
                    width: '550px',
                    height: '300px',
                    margin: "auto"
                }}>
                    <ReactQuill theme="snow" value={value} onChange={setValue} style={{height: '258px'}}/>
                </div>
            </Grid>
        </Grid>


        <Button variant="contained" sx={{m: '1.6rem'}} onClick={handleUploadAndSave}>
            Upload and Save</Button> </Paper>
}
