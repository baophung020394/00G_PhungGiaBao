import { Alert, Grid, InputAdornment, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { CurrencyContext } from "../context/CurrencyContext";

const InputAmount = () => {
  const { firstAmount, setFirstAmount } = useContext(CurrencyContext);
  const [hasError, setHasError] = useState(false);
  /**
   * Validate negative
   */
  const handleBlur = (e) => {
    const value = parseFloat(e.target.value);

    if (isNaN(value) || value < 0) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  return (
    <>
      <Grid item xs={12} md>
        <TextField
          value={firstAmount}
          onChange={(e) => setFirstAmount(e.target.value)}
          label={hasError ? "Amount must be a non-negative number." : "Amount"}
          fullWidth
          onBlur={handleBlur}
          InputProps={{
            type: "number",
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          error={hasError}
        />
      </Grid>
    </>
  );
};

export default InputAmount;
