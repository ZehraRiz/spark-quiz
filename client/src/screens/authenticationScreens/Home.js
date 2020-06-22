import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  Container,
  Typography,
  TextField,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/logo1.png";
import * as authActions from "../../store/actions/authActions";
import { useDispatch } from "react-redux";

const Home = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const studentLoginHandler = async (e) => {
    e.preventDefault();
    const studentId = e.target.code.value;
    await dispatch(authActions.studentLogin(studentId));
    props.history.push("/quiz");
    //don't forget error handling
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          alt="logo"
          src={logo}
          width={30}
          height={30}
          className={classes.large}
        />
        <Typography component="h1" variant="h5">
          Hello There!
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={studentLoginHandler}
        >
          <Link to="/login">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              SignIn
            </Button>
          </Link>
          <Link to="/register">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
          </Link>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="code"
            label="Have a code?"
            name="code"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Go
          </Button>
        </form>
        I like the transparent background more
      </div>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    padding: "20px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

export default Home;
