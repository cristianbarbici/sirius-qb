import React from "react";
import SplField, { useSplatField, dateFormat } from "../SplatComponents/SplField";
import BusinessTitleField from "./BusinessTitleField";
import TextField from "./TextField";
import DatePicker from "./DatePicker";
import SplAction from "../SplatComponents/SplAction";
import Button from "./Button";
import { useStyles } from "../Hooks/useStyles";
import { Box, MenuItem } from "@material-ui/core";
import CoinsuranceSwitch from "./CoinsuranceSwitch";
import { useProcessState } from "../SplatComponents/SplProcess";
import Select from "./Select";

export default function CreateQuickBusiness(props) {
  const [startDate, handleStartDateChange] = useSplatField("process_StartDate", dateFormat);
  const [endDate, handleEndDateChange] = useSplatField("process_EndDate", dateFormat);

  const processState = useProcessState();
  const classes = useStyles();

  return (
    <div className={classes.formContainer}>
      <form className={classes.root} noValidate autoComplete="off">
        <Box display="flex" flexDirection="row">
          <SplAction name="CreateBusiness">
            <Button label="Create Business" />
          </SplAction>
          <SplAction name="Init">
            <Button label="Reset All" />
          </SplAction>
          <SplAction name="GenerateDummyData">
            <Button label="Generate" />
          </SplAction>
        </Box>
        <SplField path="process_BusinessLayer.BusinessTitle">
          <BusinessTitleField />
        </SplField>
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
        <Box display="flex" flexDirection="row">
          <SplField path="process_TypeOfBusiness.Name">
            <TextField id="TypeOfBusiness" label="Type of Business" select>
              {processState.TypeOfBusinessOptions.map((option) => (
                <MenuItem key={option.Code} value={option.Name}>
                  {option.Name}
                </MenuItem>
              ))}
            </TextField>
          </SplField>
          <SplField path="process_TypeOfParticipation.Name">
            <TextField
              id="TypeOfParticipation"
              label="Type of Participation Method"
            >
              {/* TypeOfParticipation options depends on the selected Type of Business… */}
            </TextField>
          </SplField>
          <SplField path="process_IsCoinsurance">
            <CoinsuranceSwitch />
          </SplField>
        </Box>
        <Box display="flex" flexDirection="row">
          <SplField path="process_Reinsurer">
            <Select
              id="Reinsurer"
              label="Reinsurer"
              options={processState.ReinsurerOptions}
              optionKey="Code"
              optionName="Name"
            />
          </SplField>
          <SplField path="process_ReportingUnit.Name">
            <TextField id="ReportingUnit" label="Reporting Unit">
              {/* ReportingUnit depends on selected Reinsurer? */}
            </TextField>
          </SplField>
          <SplField path="process_MainClassOfBusiness.Name">
            <Select
              id="MainClassOfBusiness"
              label="Main class of business"
              options={processState.MainClassOfBusinessOptions}
              optionKey="Code"
              optionName="Name"
            />
          </SplField>
        </Box>
      </form>
    </div>
  );
}
