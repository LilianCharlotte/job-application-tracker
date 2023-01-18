import {User} from "../model/User";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
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
import {JobPostingRequest, WorkModel} from "../model/JobPosting";
import {useNavigate} from "react-router-dom";

export type AddJobPostingProps = {
    user: User,
    addJobPosting: (jobPostingRequest: JobPostingRequest) => void,
}

export default function AddJobPosting(props: AddJobPostingProps) {
    const navigate = useNavigate();
    const [newJobPostingRequest, setNewJobPostingRequest] = useState({} as JobPostingRequest);
    const [isApplicationUnsolicited, setIsApplicationUnsolicited] = useState(false);
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    const checkIfUnsolicited = () => {
        setIsApplicationUnsolicited(!isApplicationUnsolicited);
        setNewJobPostingRequest(jobPostingRequest => ({
            ...jobPostingRequest,
            isUnsolicited: isApplicationUnsolicited
        }))
    }

    const handleChangeJobPostingCompanyName = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setNewJobPostingRequest(jobPostingRequest => ({
            ...jobPostingRequest,
            companyName: event.target.value
        }))
    }

    function handleChangeJobPostingLocation(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setNewJobPostingRequest(jobPostingRequest => ({
            ...jobPostingRequest,
            locatedAt: event.target.value
        }))
    }

    const handleChangeJobPostingDescription = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setNewJobPostingRequest(jobPostingRequest => ({
            ...jobPostingRequest,
            jobDescription: event.target.value
        }))
    }

    function handleChangeJobPostingLink(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setNewJobPostingRequest(jobPostingRequest => ({
            ...jobPostingRequest,
            jobPostingLink: event.target.value
        }))
    }

    function handleChangeRemote(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setNewJobPostingRequest(jobPostingRequest => ({
            ...jobPostingRequest,
            remote: event.target.value as WorkModel
        }))
    }

    function onSaveJobPosting(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log("Adding job posting", newJobPostingRequest);
        props.addJobPosting(newJobPostingRequest);
        navigate("/");

    }

    return (<div>
        <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Card sx={{display: 'flex', flexDirection: 'row', padding: '2rem'}}>
                <CardContent sx={{flex: '1 0 auto', padding: 'unset'}}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 1, width: '25ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography variant="h3" gutterBottom sx={{color: theme.palette.primary.main}}>
                            Add a job posting
                        </Typography>
                        <br/>
                        <Grid container spacing={2} style={{width: '600px'}}>
                            <Grid item xs={5}>
                                <Typography component={"div"} sx={{fontSize: 18}}>
                                    Company name:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField id="outlined-basic"
                                           style={{width: '95%'}}
                                           variant="outlined"
                                           size="small"
                                           label="Company name"
                                           value={newJobPostingRequest.companyName}
                                           onChange={handleChangeJobPostingCompanyName}
                                />
                            </Grid>

                            <Grid item xs={5}>
                                <Typography component={"div"} sx={{fontSize: 18}}>
                                    Located in:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField id="outlined-basic"
                                           style={{width: '95%'}}
                                           variant="outlined"
                                           size="small"
                                           label={"City or region"}
                                           value={newJobPostingRequest.locatedAt}
                                           onChange={handleChangeJobPostingLocation}
                                />
                            </Grid>

                            <Grid item xs={5}>
                                <Typography component={"div"} sx={{fontSize: 18}}>
                                    Do you want to send an unsolicited application?
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Checkbox {...label}
                                          sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                                          color="secondary"
                                          onClick={checkIfUnsolicited}
                                          checked={isApplicationUnsolicited}/>
                            </Grid>
                            {!isApplicationUnsolicited ? (<>
                                <Grid item xs={5}>
                                    <Typography component={"div"} sx={{fontSize: 18}}>
                                        Job title: </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField id="outlined-basic"
                                               style={{width: '95%'}}
                                               variant="outlined"
                                               size="small"
                                               label={"Job title"}/>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography component={"div"} sx={{fontSize: 18}}>
                                        Insert a short job description with keywords of the most important
                                        aspects: </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField id="outlined-basic"
                                               label="Job description"
                                               style={{width: '95%'}}
                                               variant="outlined"
                                               size="small"
                                               multiline
                                               rows={4}
                                               value={newJobPostingRequest.jobDescription}
                                               onChange={handleChangeJobPostingDescription}/>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography component={"div"} sx={{fontSize: 18}}>
                                        Insert a link to the job posting: </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField id="outlined-basic"
                                               label="Link"
                                               style={{width: '95%'}}
                                               variant="outlined"
                                               size="small"
                                               value={newJobPostingRequest.jobPostingLink}
                                               onChange={handleChangeJobPostingLink}/>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography component={"div"} sx={{fontSize: 18}}>
                                        Do they offer working remotely? </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Working models</FormLabel>
                                        <RadioGroup
                                            defaultValue="Office only"
                                            name="radio-buttons-group"
                                            value={newJobPostingRequest.remote}
                                            onChange={handleChangeRemote}
                                        >
                                            <FormControlLabel value="IN_OFFICE" control={<Radio/>}
                                                              label="Office only"/>
                                            <FormControlLabel value="REMOTE" control={<Radio/>} label="Remote"/>
                                            <FormControlLabel value="HYBRID" control={<Radio/>} label="Hybrid"/>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </>) : <>
                                <Grid item xs={5}>
                                    <Typography component={"div"} sx={{fontSize: 18}}>
                                        Insert a link to the career page of the company: </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField id="outlined-basic"
                                               label="Link"
                                               style={{width: '95%'}}
                                               variant="outlined"
                                               size="small"
                                               value={newJobPostingRequest.jobPostingLink}
                                               onChange={handleChangeJobPostingLink}/>
                                </Grid>
                            </>}
                        </Grid>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'right', mr: '2rem', mt: '1.5rem'}}>
                        <Button variant="contained" sx={{m: '0.2rem'}}>Discard changes</Button>
                        <Button variant="contained" sx={{m: '0.2rem'}} onClick={onSaveJobPosting}>
                            Save job posting</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    </div>)
}
