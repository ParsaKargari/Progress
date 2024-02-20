import { React, useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import dayjs from 'dayjs';

const theme = createTheme({
    typography: {
      fontFamily: 'Inter, sans-serif',
      fontSize: 14
    }
});
  
const useStyles = makeStyles((theme) => ({
    datePickerInput: {
    border: 'none', // remove border
    '& .MuiInputBase-input': {
    padding: '12px', // adjust padding as needed
    },
    '& .MuiInput-underline:before': {
    borderBottom: 'none', // remove underline
    },
    '& .MuiPickersDay-day': {
    // Remove border from day buttons
    borderRadius: 0,
    }
}
}));
  
  
  


export function TaskComponent (props) {
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };



    const { taskDescription, dueDate, status, visibilityDB } = props;
    // console.log(taskDescription);
    // console.log(dueDate);
    // console.log(status);
    // console.log(visibilityDB);


    const [checked, setChecked] = useState(false);
    const [visibility, setVisibility] = useState(false);
    
    const handleChange = (event) => {
        setChecked(event.target.checked);
        if(event.target.checked === true){
            var task = document.getElementById(`TaskDescr-${taskDescription}`);
            task.classList.add("line-through");
        }
        else{
            var task = document.getElementById(`TaskDescr-${taskDescription}`);
            task.classList.remove("line-through");
        }
    };

    return (
        <>
            <div className="bg-red-300 mb-2 flex flex-row">
                
                <div className="pr-2">
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                </div>

                <div className="flex flex-col ">
                    <div>
                        <h1 
                            id={`TaskDescr-${taskDescription}`}
                            className="font-standard text-DarkGrey decoration-DarkGrey decoration-2 truncate font-bold	text-base transition duration-500"
                        >

                            {props.taskDescription}

                        </h1>
                    </div>

                    <div className="font-standard text-DarkGrey">
                        <p>Due Edit Delete</p>

                        <ThemeProvider theme={theme}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker 
                                label="Select date"
                                inputFormat="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} className={classes.datePickerInput} />}
                                defaultValue={dayjs('2022-04-17')} />
                            </LocalizationProvider>
                        </ThemeProvider>

                    </div>
                </div>
            </div>
        </>
    )
}