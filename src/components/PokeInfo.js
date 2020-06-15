import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const PokeInfo = ({ open, onClose, onChoosePokemon }) => {
  const theme = useTheme();
  const { id } = useParams();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [fullPoke, setFullPoke] = useState(null);

  useEffect(() => {
    fetch(`/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setFullPoke(data))
      .catch(() => alert("No Pokemon matches that ID"));
  }, [id]);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="PokeInfo-title"
      >
        <DialogTitle id="PokeInfo-title">
          {fullPoke &&
            `Here's the data we have about ${fullPoke.name.english}:`}
        </DialogTitle>
        <DialogContent style={{ marginTop: "-1.5em" }}>
          <DialogContentText>
            {fullPoke && (
              <>
                <h3>Names</h3>
                {Object.keys(fullPoke.name).map((key, index) => {
                  return (
                    <p key={`${key}-${index}`}>
                      {key}: {fullPoke.name[key]}
                    </p>
                  );
                })}
                <h3>Type</h3>
                {fullPoke.type &&
                  fullPoke.type.length &&
                  fullPoke.type.map((type, index) => {
                    return <p key={`${type}-${index}`}>{type}</p>;
                  })}
                <h3>Base</h3>
                {Object.keys(fullPoke.base).map((key, index) => {
                  return (
                    <p key={`${key}-${index}`}>
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
          {fullPoke && (
            <Button
              onClick={() => onChoosePokemon(fullPoke)}
              color="primary"
              autoFocus
            >
              {`${fullPoke.name.english}, I choose you!`}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PokeInfo;
