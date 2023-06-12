import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { INotifyBar } from "../models/General";

const useNotifyBar = () => {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<INotifyBar>(null);
  const closeToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const openToast = (config: INotifyBar) => {
    setConfig(config);
    setOpen(true);
  };

  const snackBar = config ? (
    <Snackbar
      data-cy={"notifyBar"}
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={5000}
      onClose={closeToast}
    >
      <Alert onClose={closeToast} severity={config.type} sx={{ width: "100%" }}>
        {config.message}
      </Alert>
    </Snackbar>
  ) : null;
  return [openToast, closeToast, snackBar];
};

export default useNotifyBar;
