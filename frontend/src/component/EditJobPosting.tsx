import {JobPostingRequest} from "../model/JobPosting";
import {useLocation} from "react-router-dom";
import {Box, Button, Card, CardContent, Grid, TextField, Typography} from "@mui/material";
import {theme} from "../App";

type EditJobPostingProps = {
    handleEditJobPosting(jobPostingId: string, jobPostingRequest: JobPostingRequest): void
}
export default function EditJobPosting(props: EditJobPostingProps) {
    const {state} = useLocation();
    const {jobPosting} = state;

    return (<Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
        <Card sx={{display: 'flex', flexDirection: 'row', padding: '2rem'}}>
            <CardContent sx={{flex: '1 0 auto', padding: 'unset'}}>
                <Grid container spacing={2} style={{width: '450px'}}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {m: 1, width: '43ch'},
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
                                    id="outlined-helperText"
                                    label={"Company name"}
                                    defaultValue={jobPosting.companyName}
                                    value={jobPosting.companyName}
                                /> </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-helperText"
                                    label={"Job title"}
                                    defaultValue={jobPosting.jobTitle}
                                    value={jobPosting.jobTitle}
                                /> </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-helperText"
                                    label={"Job description"}
                                    defaultValue={jobPosting.jobDescription}
                                    value={jobPosting.jobDescription}
                                /> </Grid>

                        </div>
                    </Box>
                </Grid>
                <Box sx={{display: 'flex', justifyContent: 'right', mr: '2rem', mt: '1.5rem'}}>
                    <Button variant="contained" sx={{m: '0.2rem'}}>Discard changes</Button>
                    <Button variant="contained" sx={{m: '0.2rem'}}>
                        Save changes</Button>
                </Box>
            </CardContent>
        </Card>
    </Box>)
}
