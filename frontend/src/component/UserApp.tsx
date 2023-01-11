import useUser from "../hook/useUser";
import JobPostingGallery from "./JobPostingGallery";
import {Container, Grid} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import JobPostingDetails from "./JobPostingDetails";

export default function UserApp() {

    const {user} = useUser("1")


    return <div>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >
            <Container
                sx={{backgroundColor: 'primary', textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="" element={user ?
                            <JobPostingGallery user={user}/>
                            :
                            <p>User is undefined.</p>}/>
                        <Route path="/details" element={<JobPostingDetails/>}/>
                    </Routes>
                </BrowserRouter>
            </Container>
        </Grid>
    </div>

}
