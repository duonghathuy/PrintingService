import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Calendar({start, end, handleStartChange, handleEndChange}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['DatePickerStart', 'DatePickerEnd']}
      >
        <DemoItem label="Ngày bắt đầu">
          <DatePicker value={start} onChange={handleStartChange}/>
        </DemoItem>
        <DemoItem label="Ngày kết thúc">
          <DatePicker value={end} onChange={handleEndChange}/>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}



