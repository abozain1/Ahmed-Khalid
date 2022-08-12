import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import Box from "@mui/material/Box";
import React, { useState } from "react";

const Datefilter = ({ changeDate }) => {
  const [value, setValue] = useState([null, null]);
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={{ start: "from", end: "to" }}
    >
      <DateRangePicker
        maxDate={new Date()}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          changeDate(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
};
export default Datefilter;
