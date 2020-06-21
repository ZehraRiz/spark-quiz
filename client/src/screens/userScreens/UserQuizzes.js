import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../store/actions/userActions";
import * as quizActions from "../../store/actions/quizActions";
import { Card, CardContent, CardActions, Grid, Typography, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "100%",
		padding: "30px",
		display: "flex",
		flexDirection: "row",
		overflowY: "scroll",
		overflowX: "hidden",
		alignItems: "flex-start",
		justifyContent: "center"
	},
	card: {
		minWidth: 275,
		margin: "5px"
	}
}));

const UserQuizzes = (props) => {
	const dispatch = useDispatch();
  const classes = useStyles();
  const quizzes = useSelector((state) => state.user.quizzes);

	useEffect(() => {
		dispatch(userActions.fetchQuizzes());
	}, []);

	const handleOpenCreateQuiz = (quiz) => {
		dispatch(quizActions.setCurrentQuiz(quiz));
    props.history.push({
      pathname: "/dashboard/createQuiz"
    });
	};

	

	const handleDeleteQuiz = (id) => {
		dispatch(userActions.deleteQuiz(id));
	};

	return (
		<Grid container spacing={2} className={classes.root}>
			<Grid item xs={12} xl={12}>
				<Typography variant="h5" align="center">
					My Quizes{" "}
				</Typography>
			</Grid>
			{quizzes.length === 0 && (
				<Grid item xl={12}>
					<Typography>You have no quizes</Typography>
				</Grid>
			)}
			{quizzes &&
				quizzes.map((quiz, index) => (
					<Card className={classes.card} key={quiz._id}>
						<CardContent>
							<Typography variant="h5" component="h2">
								Quiz Name: {quiz.quizName}
							</Typography>
							<Typography variant="body2" component="p">
								Subject: {quiz.quizSubject}
							</Typography>
							<br />
						</CardContent>
						<CardActions>
							<Button size="small" onClick={() => handleOpenCreateQuiz(quiz)}>
								Edit
							</Button>
							<Button size="small" onClick={() => handleDeleteQuiz(quiz._id)}>
								Delete
							</Button>
						</CardActions>
					</Card>
				))}
		</Grid>
	);
};

export default UserQuizzes;
