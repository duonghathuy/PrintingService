import React, { useEffect, useState } from 'react'
import StatisTicTable from './StatisticTable'
import Calendar from './date';
import { Box, Button } from '@mui/material';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'




export default function Faculty(){
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
 

  const handleFilterClick = () =>{
      if(start === null || end === null || end < start){
        setOpenDialog(true)
      }
      
      else{
        
        setFilterStart(start.format("YYYY-MM-DD"));
        setFilterEnd(end.format("YYYY-MM-DD"));
      }
  };
  return(
    <Box margin="20px">
      <Stack direction = "column" spacing = {2}>
        <Stack direction = "row" spacing = {2} alignItems="flex-end">
        <Calendar start={start} end={end} handleStartChange={handleStartChange} handleEndChange={handleEndChange} />
        <Button variant="contained" onClick={handleFilterClick}>Lọc</Button>


        </Stack>
      <StatisTicTable filterStart={filterStart} filterEnd={filterEnd}/>
      </Stack>
      <AlertDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog}/>
      
      
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