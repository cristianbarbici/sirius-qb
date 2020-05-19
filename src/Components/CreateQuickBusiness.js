import React from "react";
import SplField, { useSplatField } from "../SplatComponents/SplField";
import BusinessTitleField from "./BusinessTitleField";
import TextField from "./TextField";
import DatePicker from "./DatePicker";
import SplAction from "../SplatComponents/SplAction";
import Button from "./Button";

export default function CreateQuickBusiness(props) {
  const [ startDate, handleStartDateChange ] = useSplatField("process_StartDate");
  const [ endDate, handleEndDateChange ] = useSplatField("process_EndDate");
  
  return (
    <div>
      <form noValidate autoComplete="off">
        <SplAction name="CreateBusiness">
          <Button label="Create Business" />
        </SplAction>
        <SplAction name="Init">
          <Button label="Reset All" />
        </SplAction>
        <SplAction name="GenerateDummyData">
          <Button label="Generate" />
        </SplAction>
        <SplField path="process_BusinessLayer.BusinessTitle">
          <BusinessTitleField />
        </SplField>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
        />
        <SplField path="process_TypeOfBusiness.Name">
          <TextField
            id="TypeOfBusiness"
            label="Type of Business"
            variant="filled"
            select
          ></TextField>
        </SplField>
        <SplField path="process_TypeOfParticipation.Name">
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
        <SplField path="CoinsuranceIsDisabled"></SplField>
        <SplField path="process_Reinsurer.Name">
          <TextField
            id="Reinsurer"
            label="Reinsurer"
            variant="filled"
            select
          ></TextField>
        </SplField>
        <SplField path="process_ReportingUnit.Name">
          <TextField
            id="ReportingUnit"
            label="Reporting Unit"
            variant="filled"
          />
        </SplField>
        <SplField path="process_MainClassOfBusiness.Name">
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
