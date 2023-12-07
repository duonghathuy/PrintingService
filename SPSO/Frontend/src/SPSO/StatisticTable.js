import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ClickAwayListener, Stack, TextField } from '@mui/material';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function StatisticTable({filterStart, filterEnd, faculty, level, handleDelete, updateLevel, lower, upper}) {
  const [data, setData] = useState([]);
  const [updateId, setUpdateId] = React.useState(null);
  useEffect(() => {
    console.log(level, faculty)
    const fetchData = async () => {
        const reqData = await fetch("http://localhost:5050/rangestudent", {
          method : 'POST',
          headers: {'content-type' : 'application/json'},
          body : JSON.stringify({start_date : filterStart, end_date : filterEnd, faculty : faculty, level : level, lower : lower, upper : upper})
        });
        const resData = await reqData.json();
        setData(resData);
    };
    fetchData();
}, [filterStart, filterEnd, faculty, level, lower, upper]);
  
  const handleUpdate = (count) =>{
    setUpdateId(count);
    console.log(count);
  };
  const [newLevel, setNewLevel] = React.useState(null)
  const handleUpdateSubmit = id => {
    updateLevel(id, newLevel)
    setUpdateId(null)
  };
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>MSSV</StyledTableCell>
            <StyledTableCell align="right">Họ</StyledTableCell>
            <StyledTableCell align="right">Tên</StyledTableCell>
            
            <StyledTableCell align="right">Khoa</StyledTableCell>
            <StyledTableCell align="right">Số trang</StyledTableCell>
            <StyledTableCell align="right">Level</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, count) => (
            <StyledTableRow key={row.ID}>
              <StyledTableCell component="th" scope="row">
                {row.ID}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Lname}</StyledTableCell>
              <StyledTableCell align="right">{row.Fname}</StyledTableCell>
              <StyledTableCell align="right">{row.Faculty}</StyledTableCell>
              <StyledTableCell align="right">{row.pages}</StyledTableCell>
              {updateId == count? <StyledTableCell align="right"><TextField sx={{width: '60px',}} id="standard-basic" label="Level" variant="standard" size="small" onChange={event =>setNewLevel(event.target.value)}/></StyledTableCell> :  <StyledTableCell align="right">{row.Level}</StyledTableCell> }
              {
              updateId == count?  
                        <StyledTableCell align="right">
                          <Button variant='outlined' color='success' onClick = {e => handleUpdateSubmit(row.ID)}>Cập nhật</Button>
                        </StyledTableCell>
                         :
                        <StyledTableCell align="right">
                         <Button variant='outlined' color='error' onClick = {e => handleDelete(row.ID)}>Xóa</Button>
                         <Button variant='outlined' color='success' onClick = {e => handleUpdate(count)}>Sửa</Button>
                        </StyledTableCell> 
              }
              
            </StyledTableRow>
          ))}
   </TableBody>
      </Table>
    </TableContainer>
  );
}
