import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

export default function ResponsiveDialog({ openAuth, onClose, onChangeAuth, onSendAuth, type, authData }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openAuth}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        {type === 'register' ? 'REGISTER' : 'LOGIN'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {type === 'register' ? 'Please create an account by entering your information below' : 'You can log in to your account by entering your credentials below.'}
          </DialogContentText>
        </DialogContent>
        <Grid container direction="column" justify="center" alignItems="center">
        {type === "register" && <Grid item xs={12} style={{ paddingBottom: "1em" }}>
            <TextField id="outlined-basic" label="Username" name='username' variant="outlined" value={authData.username} onChange={onChangeAuth}/>
          </Grid>}
          <Grid item xs={12}>
            <TextField id="outlined-basic" label="Email" name='email' value={authData.email} variant="outlined" onChange={onChangeAuth}/>
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "1em" }}>
            <TextField
              id="outlined-basic"
              label="Password"
              name='password'
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
