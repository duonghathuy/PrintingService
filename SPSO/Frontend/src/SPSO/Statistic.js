import React from 'react'
import StatisTicTable from './StatisticTable'
import Calendar from './date';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import FacultySelect from './listBox';
import axios from 'axios'


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

  const [lowerBound, setLowerBound] = React.useState("")
  const  [upperBound, setUpperBound] = React.useState("")
  const [lowerSubmit, setLowerSubmit] = React.useState(null)
  const [upperSubmit, setUpperSubmit] = React.useState(null)

  

  const handleFilterClick = () =>{
      if(start === null || end === null || end < start){
        setOpenDialog(true)
      }
      else if(lowerBound !== "" && isNaN(lowerBound)){
        window.alert("Lỗi chọn khoảng: Giá trị dưới không hợp lệ");
      }
      else if(upperBound !== "" && isNaN(upperBound)){
        window.alert("Lỗi chọn khoảng: Giá trị trên không hợp lệ");
      }
      else if(lowerBound != "" && upperBound != "" && lowerBound > upperBound){
        window.alert("Lỗi chọn khoảng");
      }
      else{
        if(lowerBound == "") setLowerSubmit(null)
        else setLowerSubmit(+lowerBound)
        if(upperBound == "") setUpperSubmit(null)
        else setUpperSubmit(+upperBound)
        setFilterStart(start.format("YYYY-MM-DD"));
        setFilterEnd(end.format("YYYY-MM-DD"));
        setLevelSubmit(level)
        setFacultySubmit(faculty)
        
      }
  };

  const handleDelete = async (id)=>{
    let res = await fetch("http://localhost:5050/deleteuser/"+id ,{
      method: "DELETE",
      headers:{'content-type' : 'application/json'}

    });
    let resjson = await res.json();
    window.alert("Xóa thành công")
    window.location.reload()

  };
  
  const updateLevel = async (id, newLevel)=>{
    try{
      let res = await axios.put("http://localhost:5050/updateuser/"+id, {id, newLevel});
    // let resjson = await res.json();
      window.location.reload();
  }catch(error){
    //Canh bao
    window.alert("Giá trị level không hợp lệ");

  }
    };
  
  
    
  return(
    <Box margin="20px">
      <Stack direction = "column" spacing = {2} >
        <Stack direction = "row" spacing = {2} alignItems="flex-end">
        <Calendar start={start} end={end} handleStartChange={handleStartChange} handleEndChange={handleEndChange} />
        <FacultySelect faculty={faculty} handleFacultyChange={handleFacultyChange} level={level} handleLevelChange={handleLevelChange}/>
        </Stack>
        <Stack direction = "row" spacing = {2} alignItems="flex-end">
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Chọn khoảng
              </Typography>
              <Stack direction = "row" spacing = {2} alignItems="flex-end">
              <TextField label="Lớn hơn" variant="standard" size="small" onChange={event =>setLowerBound(event.target.value)}/>
              <TextField label="Nhỏ hơn" variant="standard" size="small" onChange={event =>setUpperBound(event.target.value)}/>
              </Stack>
            </CardContent>
          </Card>
        
        <Button variant="contained" onClick={handleFilterClick}>Lọc</Button>
        </Stack>

        
      <StatisTicTable filterStart={filterStart} filterEnd={filterEnd} faculty={facultySubmit} level={levelSubmit} handleDelete={handleDelete} updateLevel={updateLevel} lower={lowerSubmit} upper={upperSubmit}/>
      </Stack>
      <AlertDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
      
      
    </Box>
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
// sx={{width: '60px',}}