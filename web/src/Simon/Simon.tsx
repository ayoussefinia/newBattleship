import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const enum Color {
  RED = "RED",
  BLUE = "BLUE",
  GREEN = "GREEN",
  YELLOW = "YELLOW",
}

const enum ButtonStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

const sound = {
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
};

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    marginBottom: 10,
  },

  input: {
    marginBottom: 20,
  },

  red: {
    borderTopLeftRadius: 100,
    marginTop: 20,
    marginRight: 10,
    height: 100,
    width: 100,
    backgroundColor: "red",
    border: "5px solid black",
  },

  blue: {
    borderTopRightRadius: 100,
    marginTop: 20,
    height: 100,
    width: 100,
    backgroundColor: "blue",
    border: "5px solid black",
  },

  green: {
    borderBottomLeftRadius: 100,
    marginTop: 10,
    height: 100,
    width: 100,
    backgroundColor: "green",
    border: "5px solid black",
  },

  yellow: {
    borderBottomRightRadius: 100,
    marginTop: 10,
    marginLeft: 10,
    height: 100,
    width: 100,
    backgroundColor: "yellow",
    border: "5px solid black",
  },

  active: { opacity: 0.5 },

  start: {
    marginTop: 30,
    backgroundColor: "grey",
    color: "white",
  },
});

const ALL_COLORS = [Color.RED, Color.BLUE, Color.GREEN, Color.YELLOW];

export default function Simon() {
  const classes = useStyles();
  const players = ["Player1", "Player2"];

  const [player, setPlayer] = useState("");
  const [score, setScore] = useState(0);

  const [value, setValue] = React.useState<string>(players[0]);
  const [inputValue, setInputValue] = React.useState("");

  const [pattern, setPattern] = React.useState<Color[]>([]);
  const [playerPattern, setPlayerPattern] = React.useState<Color[]>([]);

  const [redStatus, setRedStatus] = React.useState<ButtonStatus>(
    ButtonStatus.INACTIVE
  );
  const [greenStatus, setGreenStatus] = React.useState<ButtonStatus>(
    ButtonStatus.INACTIVE
  );
  const [blueStatus, setBlueStatus] = React.useState<ButtonStatus>(
    ButtonStatus.INACTIVE
  );
  const [yellowStatus, setYellowStatus] = React.useState<ButtonStatus>(
    ButtonStatus.INACTIVE
  );
  const [patternIndex, setPatternIndex] = React.useState<number>(0);

  const handleAnimation = async (color: Color) => {
    switch (color) {
      case Color.GREEN:
        setGreenStatus(ButtonStatus.ACTIVE);
        await sound.green.play();
        setTimeout(() => {
          setGreenStatus(ButtonStatus.INACTIVE);
        }, 500);
        break;
      case Color.RED:
        setRedStatus(ButtonStatus.ACTIVE);
        await sound.red.play();
        setTimeout(() => {
          setRedStatus(ButtonStatus.INACTIVE);
        }, 500);
        break;
      case Color.YELLOW:
        setYellowStatus(ButtonStatus.ACTIVE);
        await sound.yellow.play();
        setTimeout(() => {
          setYellowStatus(ButtonStatus.INACTIVE);
        }, 500);
        break;
      case Color.BLUE:
        setBlueStatus(ButtonStatus.ACTIVE);
        await sound.blue.play();
        setTimeout(() => {
          setBlueStatus(ButtonStatus.INACTIVE);
        }, 500);
        break;
    }
  };

  const getRandomColor = () => {
    const randomColorPick = Math.floor(Math.random() * ALL_COLORS.length);
    const randomColor = ALL_COLORS[randomColorPick];
    return randomColor;
  };

  /* const runColors = async (): Promise<void> => {
    for await (const color of pattern) {
      await handleAnimation(color);
    }
  }; */

  const runColors = () => {
    let i = 0;
    let runColorSequence = setInterval(() => {
      handleAnimation(pattern[i]);
      i++;
      if (i >= pattern.length) {
        clearInterval(runColorSequence);
      }
    }, 800);
  };

  //reset game
  const reSetGame = () => {
    const randomColor = getRandomColor();
    setPattern([...pattern, randomColor]);
    setPatternIndex(0);
    setPlayerPattern([]);
  };

  useEffect(
    () => {
      //if (pattern.length === 0) {
      console.log("loading pattern ...", pattern);
      runColors();
    },
    //},
    [pattern]
  );

  //generate player pattern
  const generatePlayerPattern = (color: Color) => {
    setTimeout(() => handleAnimation(color), 30);
    //console.log(color)
    setPlayerPattern([...playerPattern, color]);
    setPatternIndex(patternIndex + 1);
  };

  //check move

  const checkMove = () => {
    console.log("pattern", pattern);
    console.log("playerPattern", playerPattern);
    console.log("patternIndex", patternIndex);
    ifCorrectMove();
    if (patternIndex === pattern.length && patternIndex > 0) {
      setTimeout(() => {
        setScore(patternIndex);
        reSetGame();
      }, 800);
    }
  };

  const ifCorrectMove = () => {
    if (playerPattern[patternIndex - 1] === pattern[patternIndex - 1]) {
      console.log("correct move!");
    } else {
      console.log("wrong move!");
      alert("WRONG MOVE! END OF GAME!");
      window.location.reload()
    }
  };

  useEffect(() => {
    console.log("loading player pattern ...", playerPattern);
    checkMove();
  }, [playerPattern]);

  return (
    <>
      <Grid container justifyContent="center" className={classes.root}>
        <Grid container justifyContent="center">
          <h2>Welcome to Simon Game. </h2>
        </Grid>
        <Grid container justifyContent="center">
          <Autocomplete
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setPlayer(newInputValue);
            }}
            id="controllable-states-demo"
            options={players}
            sx={{ width: 200 }}
            renderInput={(params) => (
              <TextField {...params} label="Your Name" />
            )}
          />
        </Grid>
        <h3>
          Now, it is {player}'s turn. Current score is {score}.
        </h3>
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            className={`${classes.red} ${
              redStatus === ButtonStatus.ACTIVE ? classes.active : ""
            }`}
            onClick={() => generatePlayerPattern(Color.RED)}
          ></Button>
          <Button
            variant="contained"
            className={`${classes.blue} ${
              blueStatus === ButtonStatus.ACTIVE ? classes.active : ""
            }`}
            onClick={() => generatePlayerPattern(Color.BLUE)}
          ></Button>
        </Grid>
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            className={`${classes.green} ${
              greenStatus === ButtonStatus.ACTIVE ? classes.active : ""
            }`}
            onClick={() => generatePlayerPattern(Color.GREEN)}
          ></Button>
          <Button
            variant="contained"
            className={`${classes.yellow} ${
              yellowStatus === ButtonStatus.ACTIVE ? classes.active : ""
            }`}
            onClick={() => generatePlayerPattern(Color.YELLOW)}
          ></Button>
        </Grid>
        <Button
          variant="contained"
          className={classes.start}
          onClick={reSetGame}
        >
          Start Game
        </Button>
      </Grid>

      <Grid container justifyContent="center">
        <h1>
          Winner: {player}, Score: {score}.
        </h1>
      </Grid>
    </>
  );
}
