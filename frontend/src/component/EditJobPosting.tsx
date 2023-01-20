import {JobPosting, JobPostingRequest, WorkModel} from "../model/JobPosting";
import {useLocation, useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {theme} from "../App";
import {ChangeEvent, MouseEvent, useState} from "react";

type EditJobPostingProps = {
    handleEditJobPosting(jobPostingId: string, jobPostingRequest: JobPostingRequest): void
}
export default function EditJobPosting(props: EditJobPostingProps) {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {jobPosting} = state;
    const [editedJobPosting, setEditedJobPosting] = useState<JobPosting>(jobPosting);

    function onSaveEditedJobPosting(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const editedJobPostingRequest = {
            companyName: editedJobPosting.companyName,
            isUnsolicited: editedJobPosting.isUnsolicited,
            jobTitle: editedJobPosting.jobTitle,
            jobDescription: editedJobPosting.jobDescription,
            jobPostingLink: editedJobPosting.jobPostingLink,
            remote: editedJobPosting.remote,
            locatedAt: editedJobPosting.locatedAt,
            status: editedJobPosting.status
        }
        props.handleEditJobPosting(jobPosting.id, editedJobPostingRequest);
        navigate("/");
    }

    function handleChangeJobPostingCompanyName(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setEditedJobPosting(editedJobPosting => ({
            ...editedJobPosting,
            companyName: event.target.value
        }))
    }

    function handleChangeJobPostingLocation(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setEditedJobPosting(editedJobPosting => ({
            ...editedJobPosting,
            locatedAt: event.target.value
        }))
    }

    function handleChangeJobTitle(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setEditedJobPosting(editedJobPosting => ({
            ...editedJobPosting,
            jobTitle: event.target.value
        }))
    }

    function handleChangeJobDescription(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setEditedJobPosting(editedJobPosting => ({
            ...editedJobPosting,
            jobDescription: event.target.value
        }))
    }

    function handleChangeRemote(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setEditedJobPosting(editedJobPosting => ({
            ...editedJobPosting,
            remote: event.target.value as WorkModel
        }))
    }

    return (<Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
        <Card sx={{display: 'flex', flexDirection: 'row', padding: '2rem'}}>
            <CardContent sx={{flex: '1 0 auto', padding: 'unset'}}>
                <Grid container spacing={2} style={{width: '450px'}}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {m: 1, width: '43ch'}
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <Grid item xs={12}>
                                <Typography variant="h3" gutterBottom sx={{color: theme.palette.primary.main}}>
                                    Edit job posting
                                </Typography>
                                <Typography component={"span"} sx={{fontSize: 10}} color="text.secondary"
                                            textAlign="left"
                                            gutterBottom>
                                    Id: {jobPosting.id}
                                </Typography></Grid>

                            <Grid item xs={6}>
                                <TextField
                                    id="company name"
                                    label={"Company name"}
                                    value={editedJobPosting.companyName}
                                    onChange={handleChangeJobPostingCompanyName}
                                /> </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    id="location"
                                    label={"City or region"}
                                    value={editedJobPosting.locatedAt}
                                    onChange={handleChangeJobPostingLocation}
                                /> </Grid>

                            {!editedJobPosting.isUnsolicited ? (<>
                                <Grid item xs={6}>
                                    <TextField
                                        id="job title"
                                        label={"Job title"}
                                        value={editedJobPosting.jobTitle}
                                        onChange={handleChangeJobTitle}
                                    /> </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        id="job description"
                                        label={"Job description"}
                                        value={editedJobPosting.jobDescription}
                                        onChange={handleChangeJobDescription}
                                        multiline
                                        rows={3}
                                    /> </Grid>

                                <Grid item xs={6}>
                                    <FormControl sx={{ml: '0.7rem'}}>
                                        <FormLabel id="demo-radio-buttons-group-label">Working models</FormLabel>
                                        <RadioGroup
                                            name="radio-buttons-group"
                                            value={editedJobPosting.remote}
                                            onChange={handleChangeRemote}
                                        >
                                            <FormControlLabel value="IN_OFFICE" control={<Radio/>}
                                                              label="Office only"/>
                                            <FormControlLabel value="REMOTE" control={<Radio/>} label="Remote"/>
                                            <FormControlLabel value="HYBRID" control={<Radio/>} label="Hybrid"/>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </>) : ""}

                        </div>
                    </Box>
                </Grid>
                <Box sx={{display: 'flex', justifyContent: 'right', mr: '2rem', mt: '1.5rem'}}>
                    <Button variant="contained" sx={{m: '0.2rem'}}>Discard changes</Button>
                    <Button variant="contained" sx={{m: '0.2rem'}} onClick={onSaveEditedJobPosting}>
                        Save changes</Button>
                </Box>
            </CardContent>
        </Card>
    </Box>)
}
