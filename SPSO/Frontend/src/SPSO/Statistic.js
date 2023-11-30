import React, { useEffect, useState } from 'react'
import StatisTicTable from './StatisticTable'
import Calendar from './date';
import { Button, Input } from '@mui/material';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import FacultySelect from './listBox';
import Faculty from '../Faculty/faculty';



export default function Student(){
  const [start, setStart] = React.useState(dayjs(new Date()));
  
  const handleStartChange = (date) => {
    setStart(date);
  };
  const [end, setEnd] = React.useState(dayjs(new Date()));
  const handleEndChange = (date) => {
    setEnd(date);
  };
  const [filterStart, setFilterStart] = React.useState(dayjs(new Date()).format("YYYY-MM-DD"));
  const [filterEnd, setFilterEnd] = React.useState(dayjs(new Date()).format("YYYY-MM-DD"));
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleCloseDialog = () =>{
    setOpenDialog(false);
  };

  const [faculty, setFaculty] = React.useState(null)
  const handleFacultyChange = (faculty) =>{
    setFaculty(faculty)
  }
  const [level, setLevel] = React.useState(null)
  const handleLevelChange = (level) =>{
    setLevel(level)
  }

  const [facultySubmit, setFacultySubmit] = React.useState(null)
  const [levelSubmit, setLevelSubmit] = React.useState(null)

  

  const handleFilterClick = () =>{
      if(start === null || end === null || end < start){
        setOpenDialog(true)
      }
      else{
        setFilterStart(start.format("YYYY-MM-DD"));
        setFilterEnd(end.format("YYYY-MM-DD"));
        setFacultySubmit(faculty)
        setLevelSubmit(level)
      }
  };

  const handleDelete = async (id)=>{
    let res = await fetch("http://localhost:5050/deleteuser/"+id,{
      method: "DELETE",
      headers:{'content-type' : 'application/json'}

    });
    let resjson = await res.json();
    // setFilterStart(start)
    // setFilterEnd(end)
    // setFacultySubmit(faculty)
  };

  return(
    <div>
      <Stack direction = "column" spacing = {2} >
        <Stack direction = "row" spacing = {2} alignItems="flex-end">
        <Calendar start={start} end={end} handleStartChange={handleStartChange} handleEndChange={handleEndChange} />
        <FacultySelect faculty={faculty} handleFacultyChange={handleFacultyChange} level={level} handleLevelChange={handleLevelChange}/>
        <Button variant="contained" onClick={handleFilterClick}>Lọc</Button>


        </Stack>
      <StatisTicTable filterStart={filterStart} filterEnd={filterEnd} faculty={facultySubmit} level={levelSubmit} handleDelete={handleDelete}/>
      </Stack>
      <AlertDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
      
      
    </div>
  )
}


function AlertDialog({openDialog, handleCloseDialog}) {

  return (
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ERROR"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lỗi chọn ngày
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>OK</Button>
        </DialogActions>
      </Dialog>
  );
}