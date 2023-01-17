import useUser from "../hook/useUser";
import JobPostingGallery from "./JobPostingGallery";
import {AppBar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import JobPostingDetails from "./JobPostingDetails";
import {ColumnStatus} from "../model/JobPosting";
import {MouseEvent, useState} from "react";

export default function UserApp() {

    const {user, updateJobPostingStatus, deleteJobPosting} = useUser("1");

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleMoveJobPosting(jobPostingId: string, laneToMoveTo: ColumnStatus) {
        updateJobPostingStatus(jobPostingId, laneToMoveTo);
    }

    function handleDeleteJobPosting(jobPostingId: string) {
        deleteJobPosting(jobPostingId);
    }

    return <div>
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                    >
                        <MenuItem onClick={handleClose}>Add job posting</MenuItem>
                    </Menu>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Job Application Tracker
                    </Typography>
                    <Button color="inherit">{user ? user.name : "User is undefined."}</Button>
                </Toolbar>
            </AppBar>
        </Box>
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
    </div>
}
