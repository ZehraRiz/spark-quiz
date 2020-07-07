import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddQuestionModal from "../../components/modals/AddQuestionModal";
import PreviewQuestions from "../../components/UI/PreviewQuestions";
import QuizOptionsModal from "../../components/modals/QuizOptionsModal";
import ShareModal from "../../components/modals/ShareModal";
import * as quizActions from "../../store/actions/quizActions";

import { createQuizScreenStyles, customStyles, screenLayoutStyles } from "../../style/screenStyles";
import { Paper, Button, Box, Typography, Grid, TextField, Divider  } from "@material-ui/core";
import clsx from "clsx";
import Modal from "react-modal";
import CustomSnackbar from "../../components/mui/Snackbar";
import V from "max-validator";
import { createQuizValidation } from "../../utils/validation";

//MAIN
export default function CreateQuizScreen(props) {
	const dispatch = useDispatch();
	const quiz = useSelector((state) => state.quiz);
	const quizId = useSelector((state) => state.quiz._id);
	const classes = createQuizScreenStyles();
	const root = screenLayoutStyles();
	const [ displayedComponent, setDisplayedComponent ] = useState();
	const [ quizName, setQuizName ] = useState("");
	const [ quizSubject, setQuizSubject ] = useState("");
	const [ modalIsOpen, setIsOpen ] = useState(false);
	const [validationError, setValidationError] = useState("")

  //ON PAGE RELOAD
  const getQuiz = () => {
    dispatch(quizActions.loadQuiz());
  };
  useEffect(() => {
    if (quizId === "") {
      getQuiz();
    }
  }, []);

  //OTHER HOOKS


  //HANDLERS
  const showModal = (screen) => {
    switch (screen) {
      case "addNewQuestion":
        setDisplayedComponent(
          <AddQuestionModal closeModal={closeModal} quiz={quiz} />
        );
        break;
      case "quizOptions":
        setDisplayedComponent(
          <QuizOptionsModal quizId={quiz._id} closeModal={closeModal} />
        );
        break;
      case "invite":
        setDisplayedComponent(
          <ShareModal quizId={quiz._id} closeModal={closeModal} />
        );
        break;
      default:
        return;
    }
    setIsOpen(true);
    return;
  };

  const editQuestion = (id) => {
    setIsOpen(true);
    setDisplayedComponent(
          <AddQuestionModal
            closeModal={closeModal}
            quiz={quiz}
            questionToEdit={id}
          />
        )
  };

  const handleCreate = () => {
    setValidationError("");
    const result = V.validate({ quizName, quizSubject }, createQuizValidation);
    if (result.hasError) {
      if (result.getError("quizName"))
        setValidationError(result.getError("quizName"));
      else if (result.getError("quizSubject") !== "")
        setValidationError(result.getError("quizSubject"));
      return;
    } else {
      dispatch(quizActions.createQuiz(quizName, quizSubject));
      setQuizName(quiz.quizName);
      setQuizSubject(quiz.quizSubject);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  const publishQuiz = () => {
    if (
      //probably easier to just create empty contacts and groups arrays on initial state object in quizReducer
      !quiz.quizInvites.contacts ||
      quiz.quizInvites.contacts.length === 0
    ) {
      if (
        window.confirm(
          "You are publishing a quiz without any invites. Continue?"
        )
      ) {
        dispatch(quizActions.publishQuiz(quiz._id));
        //maybe redirect to My Quizzes here?
      } else {
        return;
      }
    }
    //repetition!
    dispatch(quizActions.publishQuiz(quiz._id));
  };

	//RETURN
	return (
		<Fragment>
			{validationError !== "" &&
				<CustomSnackbar
				severity="error"
				message={validationError}
				handleClose={() => setValidationError("")}/>
			}
			{!quizId && (
						<Grid container spacing={2} className={root.root}>
			<Grid item xs={12} xl={12}>
				<Typography variant="h4" align="center">
					Create a new Quiz
				</Typography>
				      <Divider variant="middle"  />
			</Grid>
						<Grid container spacing={2} style={{ width: "400px" }}>
						<Grid item xs={12} md={6}>
							<Typography variant="h5" align="center"  >Quiz name:</Typography>
						</Grid>
						<Grid item xs={12} md={6} align="center">
							<TextField
								type="text"
								name="name"
								variant="outlined"
								color="secondary"
								maxLength="15"
								onChange={(event) => {
									setQuizName(event.target.value);
								}}
								value={quizName}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant="h5" align="center" >Quiz Subject</Typography>
						</Grid>
						<Grid item xs={12} md={6} align="center">
							<TextField
								type="text"
								name="subject"
								variant="outlined"
								color="secondary"
								maxLength="15"
								onChange={(event) => {
									setQuizSubject(event.target.value);
								}}
								value={quizSubject}
							/>
						</Grid>
						<Grid item xs={12} align="center" >
							<Button onClick={handleCreate} variant="contained" color="secondary">
								Submit
							</Button>
						</Grid>
					</Grid></Grid>
			)}
			{quiz._id.length > 0 && (
				<div className={classes.makeNewQuizContainer}>
					<Modal
						isOpen={modalIsOpen}
						onRequestClose={closeModal}
						style={customStyles}
						aria-labelledby="contained-modal-title-vcenter"
						centered>
						{displayedComponent} {/* can be either addquestion/ setQuizOptions /invite */}
					</Modal>
					<Paper className={clsx(classes.flexItem, classes.buttonContainer)}>
						<Box className={classes.titleContainer}>
							<Typography variant="body1">Quiz Name: </Typography>
							<Typography variant="h4" color="secondary">
							{quiz.quizName}</Typography>
							{quiz.quizTimeLimit ? (
								<Typography>Quiz Timelimit: {(quiz.quizTimeLimit==="false")? <>No limit</> : quiz.quizTimeLimit}</Typography>
							) : (
								""
							)}
						</Box>
						<Box className={classes.buttons}>
						<Button
							variant="outlined"
							color="primary"
							className={classes.button}
							onClick={() => showModal("quizOptions")}>
							Quiz Options
						</Button>
						<Button
							variant="outlined"
							color="primary"
							className={classes.button}
							onClick={() => showModal("addNewQuestion")}>
							Add Question
						</Button>

              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => showModal("invite")}
              >
                Invite
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={publishQuiz}
              >
                {quiz.quizPublished ? <>Update Quiz </> : <>Publish Quiz</>}
              </Button>
            </Box>
          </Paper>
          <Paper className={classes.flexItem} style={{ flex: 3 }}>
            <PreviewQuestions editQuestion={editQuestion} />
          </Paper>
        </div>
      )}
    </Fragment>
  );
}
