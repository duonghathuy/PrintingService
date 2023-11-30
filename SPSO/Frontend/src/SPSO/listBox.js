import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/material';

export default function FacultySelect({faculty, handleFacultyChange, level, handleLevelChange}) {
    const [faculties, setFaculties] = React.useState([]);
    const [levels, setLevels] = React.useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const reqData = await fetch("http://localhost:5050/facultyList")
            .then(res => res.json())
            .then(data => setFaculties(data))
            const reqLevel = await fetch("http://localhost:5050/levelList")
            .then(res => res.json())
            .then(data => setLevels(data))
        };
        fetchData();
    }, []);
  return (
    <Stack direction = "row" spacing = {2} alignItems="flex-end">
    <Autocomplete  value={faculty} onChange={(event, newValue) => {handleFacultyChange(newValue);}}
      disablePortal
      id="faculty-combo-box"
      options={faculties.map((option) => option.faculty)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Chọn khoa" />}
    />
    <Autocomplete  value={level} onChange={(event, newValue) => {handleLevelChange(newValue);}}
      disablePortal
      id="level-combo-box"
      options={levels.map((option) => option.level)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Chọn level" />}
    />
    </Stack>
  );
}

