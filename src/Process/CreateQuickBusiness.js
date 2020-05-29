import React from "react";
import SplField, { useSplatField, dateFormat } from "../SplatComponents/SplField";
import TextField from "../Components/TextField";
import DatePicker from "../Components/DatePicker";
import SplAction from "../SplatComponents/SplAction";
import Button from "../Components/Button";
import { useStyles } from "../Hooks/useStyles";
import { Box, MenuItem } from "@material-ui/core";
import CoinsuranceSwitch from "../Components/CoinsuranceSwitch";
import { useProcessState } from "../SplatComponents/SplProcess";
import Select from "../Components/Select";


import FormRow from "../Components/common/FormRow";
import BusinessTitle from "../Components/quick-business/BusinessTitle";
import TypeOfBusiness from "../Components/quick-business/TypeOfBusiness";


export default function CreateQuickBusiness(props) {
  const [startDate, handleStartDateChange] = useSplatField("process_StartDate", dateFormat);
  const [endDate, handleEndDateChange] = useSplatField("process_EndDate", dateFormat);

  const processState = useProcessState();
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">

      
      <BusinessTitle />
      <TypeOfBusiness />
      

      <FormRow>
        <SplField path="process_TypeOfBusiness.Name">
          <TextField id="TypeOfBusiness" label="Type of Business" select>
            {processState.TypeOfBusinessOptions.map((option) => (
              <MenuItem key={option.Code} value={option.Name}>
                {option.Name}
              </MenuItem>
            ))}
          </TextField>
        </SplField>
      </FormRow>

      <FormRow>
        <SplField path="process_TypeOfParticipation.Name">
          <TextField
            id="TypeOfParticipation"
            label="Type of Participation Method"
          >
            {/* TypeOfParticipation options depends on the selected Type of Business… */}
          </TextField>
        </SplField>
      </FormRow>

      <FormRow>
        <SplField path="process_IsCoinsurance">
          <CoinsuranceSwitch />
        </SplField>
      </FormRow>

      <FormRow>
        <Box display="flex" flexDirection="row">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
          ></DatePicker>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
          ></DatePicker>
        </Box>
      </FormRow>

      <FormRow>
        <SplField path="process_ReportingUnit.Name">
          <TextField id="ReportingUnit" label="Reporting Unit">
            {/* ReportingUnit depends on selected Reinsurer? */}
          </TextField>
        </SplField>
        {/* 
        <SplField path="process_Reinsurer">
          <Select
            id="Reinsurer"
            label="Reinsurer"
            options={processState.ReinsurerOptions}
            optionKey="Code"
            optionName="Name"
          />
        </SplField>
        */}
      </FormRow>

      <FormRow>
        <SplField path="process_MainClassOfBusiness">
          <Select
            id="MainClassOfBusiness"
            label="Main class of business"
            options={processState.MainClassOfBusinessOptions}
            optionKey="Code"
            optionName="Name"
          />
        </SplField>
      </FormRow>

      <FormRow>
        <SplAction name="CreateBusiness">
          <Button label="Create Business" />
        </SplAction>
        <SplAction name="Init">
          <Button label="Reset All" />
        </SplAction>
        <SplAction name="GenerateDummyData">
          <Button label="Generate" />
        </SplAction>
      </FormRow>
    </form>
  );
}
