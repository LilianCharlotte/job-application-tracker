import useUser from "../hook/useUser";
import JobPostingGallery from "./JobPostingGallery";
import {Container, Grid} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import JobPostingDetails from "./JobPostingDetails";
import {ColumnStatus} from "../model/JobPosting";

export default function UserApp() {

    const {user, updateJobPostingStatus, deleteJobPosting} = useUser("1");

    function handleMoveJobPosting(jobPostingId: string, laneToMoveTo: ColumnStatus) {
        updateJobPostingStatus(jobPostingId, laneToMoveTo);
    }

    function handleDeleteJobPosting(jobPostingId: string) {
        deleteJobPosting(jobPostingId);
    }

    return <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{minHeight: '100vh', p: '7rem'}}
    >
        <Container
            sx={{backgroundColor: 'primary', alignItems: 'center', justifyContent: 'center'}}>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={user ?
                        <JobPostingGallery user={user}/>
                        :
                        <p>User is undefined.</p>}/>
                    <Route path="/details" element={<JobPostingDetails handleMoveJobPosting={handleMoveJobPosting}
                                                                       handleDeleteJobPosting={handleDeleteJobPosting}/>}/>
                </Routes>
            </BrowserRouter>
        </Container>
    </Grid>
}
