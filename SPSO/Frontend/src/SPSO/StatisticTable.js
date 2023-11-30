import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button, ClickAwayListener, Stack } from '@mui/material';
import Input from '@mui/material/Input';


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


export default function StatisticTable({filterStart, filterEnd, faculty, level, handleDelete}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const reqData = await fetch("http://localhost:5050/rangestudent", {
          method : 'POST',
          headers: {'content-type' : 'application/json'},
          body : JSON.stringify({start_date : filterStart, end_date : filterEnd, faculty : faculty, level : level})
        });
        const resData = await reqData.json();
        setData(resData);
    };
    fetchData();
}, [filterStart, filterEnd, faculty]);
  const [message, setMessage] = React.useState()
  // const handleDelete = async (id)=>{
  //   let res = await fetch("http://localhost:5050/deleteuser/"+id,{
  //     method: "DELETE",
  //     headers:{'content-type' : 'application/json'}

  //   });
  //   let resjson = await res.json();
  //   if(res.status===200){
  //     setMessage(resjson.success);
  //   }
  // };
  const handleUpdate = async (id)=>{
    console.log(id)
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
          {data.map((row) => (
            <StyledTableRow key={row.ID}>
              <StyledTableCell component="th" scope="row">
                {row.ID}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Lname}</StyledTableCell>
              <StyledTableCell align="right">{row.Fname}</StyledTableCell>
              <StyledTableCell align="right">{row.Faculty}</StyledTableCell>
              <StyledTableCell align="right">{row.pages}</StyledTableCell>
              <StyledTableCell align="right">{row.Level}</StyledTableCell>
              <StyledTableCell align="right">
                {/* <Stack align = 'right' direction = "row" spacing = {1}> */}
                <Button variant='outlined' color='error' onClick = {e => handleDelete(row.ID)}>Xóa</Button>
                <Button variant='outlined' color='success' onClick = {e => handleUpdate(row.ID)}>Sửa</Button>
                {/* </Stack> */}
              </StyledTableCell>
            </StyledTableRow>
          ))}
   </TableBody>
      </Table>
    </TableContainer>
  );
}
