import React, { useState } from "react";
import SplField from "../SplatComponents/SplField";
import BusinessTitleField from "./BusinessTitleField";
import TextField from "./TextField";
import DatePicker from "./DatePicker";

export default function CreateQuickBusiness(props) {
  // fake data for date pickers
  const [startDate, handleStartDateChange] = useState(new Date());
  const [endDate, handleEndDateChange] = useState(new Date());

  const eventTarget = (fn) => (event) => fn(event.target.value)

  return (
    <div>
      <form noValidate autoComplete="off">
        <SplField field="process_BusinessLayer.BusinessTitle">
          <BusinessTitleField />
        </SplField>
        <SplField field="process_StartDate">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={eventTarget(handleStartDateChange)}
          />
        </SplField>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={eventTarget(handleEndDateChange)}
        />
        <SplField field="process_TypeOfBusiness.Name">
          <TextField
            id="TypeOfBusiness"
            label="Type of Business"
            variant="filled"
            select
          ></TextField>
        </SplField>
        <SplField field="process_TypeOfParticipation.Name">
          <TextField
            id="TypeOfParticipation"
            label="Type of Participation Method"
            variant="filled"
          >
            {/* TypeOfParticipation options depends on the selected Type of Business…
                context.TypeOfParticipationOptions.map((option) => (
                  <MenuItem key={option.Code} value={option.Code}>
                    {option.Name}
                  </MenuItem>
                ))
                */}
          </TextField>
        </SplField>
        <SplField field="CoinsuranceIsDisabled"></SplField>
        <SplField field="process_Reinsurer.Name">
          <TextField
            id="Reinsurer"
            label="Reinsurer"
            variant="filled"
            select
          ></TextField>
        </SplField>
        <SplField field="process_ReportingUnit.Name">
          <TextField
            id="ReportingUnit"
            label="Reporting Unit"
            variant="filled"
          />
        </SplField>
        <SplField field="process_MainClassOfBusiness.Name">
          <TextField
            id="MainClassOfBusiness"
            label="Main class of business"
            variant="filled"
            select
          ></TextField>
        </SplField>
      </form>
    </div>
  );
}
