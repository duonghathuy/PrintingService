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


export default function StatisticTable({filterStart, filterEnd}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const reqData = await fetch("http://localhost:5050/rangefaculty", {
          method : 'POST',
          headers: {'content-type' : 'application/json'},
          body : JSON.stringify({start_date : filterStart, end_date : filterEnd})
        });
        const resData = await reqData.json();
        setData(resData);
    };
    fetchData();
}, [filterStart, filterEnd]);
  const [message, setMessage] = React.useState()
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell component="th" scope="row">STT</StyledTableCell>
            <StyledTableCell align="right">Khoa</StyledTableCell>
            <StyledTableCell align="right">Tổng giấy</StyledTableCell>
            <StyledTableCell align="right">Trung bình</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <StyledTableRow key={row.ID}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.faculty}</StyledTableCell>
              <StyledTableCell align="right">{row.sum_pages}</StyledTableCell>
              <StyledTableCell align="right">{row.average_pages}</StyledTableCell>
            </StyledTableRow>
          ))}
   </TableBody>
      </Table>
    </TableContainer>
  );
}
