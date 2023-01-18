import {AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router-dom";
import {MouseEvent, useState} from "react";
import {User} from "../model/User";

export type NavbarProps = {
    user: User,
}

export default function Navbar(props: NavbarProps) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleAddJobPosting() {
        setAnchorEl(null);
        navigate("/addJobPosting");
    }

    return <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
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
                        <MenuItem onClick={handleAddJobPosting}>Add job posting</MenuItem>
                    </Menu>
                    <Typography variant="h6" component="span" sx={{flexGrow: 1}} onClick={() => navigate("/")}>
                        Job Application Tracker
                    </Typography>
                    <Button color="inherit">{props.user ? props.user.name : "User is undefined."}</Button>
                </Toolbar>
            </AppBar>
        </AppBar>
    </Box>
}

