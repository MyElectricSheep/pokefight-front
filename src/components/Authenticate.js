import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  TextField,
  Grid,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const Authenticate = ({
  openAuth,
  onClose,
  onChangeAuth,
  onSendAuth,
  type,
  authData,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openAuth}
        onClose={onClose}
        aria-labelledby="authenticate-title"
      >
        <DialogTitle id="authenticate-title">
          {type === "register" ? "REGISTER" : "LOGIN"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {type === "register"
              ? "Please create an account by entering your information below"
              : "You can log in to your account by entering your credentials below."}
          </DialogContentText>
        </DialogContent>
        <Grid container direction="column" justify="center" alignItems="center">
          {type === "register" && (
            <Grid item xs={12} style={{ paddingBottom: "1em" }}>
              <TextField
                id="username"
                label="Username"
                name="username"
                variant="outlined"
                value={authData.username}
                onChange={onChangeAuth}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              name="email"
              value={authData.email}
              variant="outlined"
              onChange={onChangeAuth}
            />
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "1em" }}>
            <TextField
              id="password"
              label="Password"
              name="password"
              value={authData.password}
              variant="outlined"
              onChange={onChangeAuth}
            />
          </Grid>
        </Grid>
        <DialogActions>
          <Button autoFocus onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onSendAuth(type)} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Authenticate
