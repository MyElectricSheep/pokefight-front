import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function ResponsiveDialog({ open, onClose, onChoosePokemon }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [fullPoke, setFullPoke] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setFullPoke(data))
      .catch(() => alert("No Pokemon matches that ID"));
  }, [id]);

  console.log(fullPoke);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {fullPoke &&
            `Here's the data we have about ${fullPoke.name.english}:`}
        </DialogTitle>
        <DialogContent style={{ marginTop: "-1.5em" }}>
          <DialogContentText>
            {fullPoke && (
              <>
                <h3>Names</h3>
                {Object.keys(fullPoke.name).map((key) => {
                  return (
                    <p>
                      {key}: {fullPoke.name[key]}
                    </p>
                  );
                })}
                <h3>Type</h3>
                {fullPoke.type &&
                  fullPoke.type.length &&
                  fullPoke.type.map((type) => {
                    return <p>{type}</p>;
                  })}
                <h3>Base</h3>
                {Object.keys(fullPoke.base).map((key) => {
                  return (
                    <p>
                      {key}: {fullPoke.base[key]}
                    </p>
                  );
                })}
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose} color="primary">
            Cancel
          </Button>
          {fullPoke &&<Button onClick={() => onChoosePokemon(fullPoke)} color="primary" autoFocus>
            {`Choose ${fullPoke.name.english}`}
          </Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
