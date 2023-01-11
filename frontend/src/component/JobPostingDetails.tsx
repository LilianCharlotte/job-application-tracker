import {useLocation} from "react-router-dom";
import {Card} from "@mui/material";


export default function JobPostingDetails(){
    const {state} = useLocation();
    const {jobPosting} = state;


    return <Card>
        {jobPosting.id} <br/>
        {jobPosting.companyName} <br/>
        {jobPosting.jobTitle}
    </Card>
}
