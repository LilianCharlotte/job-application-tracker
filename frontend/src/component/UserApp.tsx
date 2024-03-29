import useUser from "../hook/useUser";
import JobPostingGallery from "./JobPostingGallery";
import {Container, Grid} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import JobPostingDetails from "./JobPostingDetails";
import {ColumnStatus, JobPostingRequest} from "../model/JobPosting";
import AddJobPosting from "./AddJobPosting";
import Navbar from "./Navbar";
import EditJobPosting from "./EditJobPosting";
import MoveToSubmittedColumn from "./MoveToSubmittedColumn";

export default function UserApp() {

    const {user, addJobPosting, updateJobPostingStatus, deleteJobPosting, editJobPostingInUser} = useUser("1");


    function handleMoveJobPosting(jobPostingId: string, laneToMoveTo: ColumnStatus) {
        updateJobPostingStatus(jobPostingId, laneToMoveTo);
    }

    function handleDeleteJobPosting(jobPostingId: string) {
        deleteJobPosting(jobPostingId);
    }

    function handleEditJobPosting(jobPostingId: string, jobPostingRequest: JobPostingRequest) {
        editJobPostingInUser(jobPostingId, jobPostingRequest);
    }

    return <BrowserRouter>
        {user ? <Navbar user={user}/> : <p>User is undefined.</p>}
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{minHeight: '100vh', p: '7rem'}}
        >
            <Container
                sx={{backgroundColor: 'primary', alignItems: 'center', justifyContent: 'center'}}>

                <Routes>
                    <Route path="" element={user ?
                        <JobPostingGallery user={user}/>
                        :
                        <p>User is undefined.</p>}/>
                    <Route path="/details" element={<JobPostingDetails handleMoveJobPosting={handleMoveJobPosting}
                                                                       handleDeleteJobPosting={handleDeleteJobPosting}/>}/>
                    <Route path="/addJobPosting"
                           element={user ? <AddJobPosting user={user} handleAddJobPosting={addJobPosting}/> :
                               <p>User is undefined.</p>}/>
                    <Route path="/editJobPosting"
                           element={<EditJobPosting handleEditJobPosting={handleEditJobPosting}/>}/>
                    <Route path={"/moveToSubmitted"}
                           element={<MoveToSubmittedColumn handleAddApplicationSubmissionDate={handleEditJobPosting}/>}
                    ></Route>
                </Routes>
            </Container>
        </Grid>
    </BrowserRouter>
}
