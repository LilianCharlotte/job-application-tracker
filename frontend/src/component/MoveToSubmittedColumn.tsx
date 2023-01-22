import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Paper, TextField, Typography} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";


export default function MoveToSubmittedColumn() {
    const [value, setValue] = useState('');
    const [date, setDate] = useState<Dayjs | null>();

    function dateToString() {
        if (date) {
            date.toISOString();
        }


    }

    return <Paper sx={{padding: "50px", alignItems: 'center'}}>
        <Typography variant={'h2'} sx={{alignItems: 'center'}}>Test</Typography>
        <div style={{display: "flex", alignItems: 'center'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="DateTimePicker"
                    value={date}
                    inputFormat="DD.MM.YYYY HH:mm"
                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
                />
            </LocalizationProvider>
            <div style={{backgroundColor: 'white', color: "black", width: '550px', height: '300px', margin: "auto"}}>
                <ReactQuill theme="snow" value={value} onChange={setValue} style={{height: '258px'}}/>
            </div>
        </div>

    </Paper>
}
