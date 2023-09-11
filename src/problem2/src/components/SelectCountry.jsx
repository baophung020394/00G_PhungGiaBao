import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material";
import React from "react";
import useAxios from "../hooks/useAxios";

const SelectCountry = (props) => {
  const [data, loaded, error] = useAxios("https://restcountries.com/v3.1/all");
  const { value, setValue, label } = props;
  console.log("data", data);
  if (loaded) {
    return (
      <Grid item xs={12} md={3}>
        <Skeleton variant="rounded" height={60} />
      </Grid>
    );
  }

  if (error) {
    return "Something went wrong!";
  }

  const dataFilter = data.filter((item) => "currencies" in item);
  const dataContries = dataFilter.map((item) => {
    return `${item.flag} ${Object.keys(item.currencies)[0]} - ${
      item.name.common
    }`;
  });
  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          console.log("newValue", newValue);
          setValue(newValue);
        }}
        options={dataContries}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Grid>
  );
};

export default SelectCountry;
