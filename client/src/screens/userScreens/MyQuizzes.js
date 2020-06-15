import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../store/actions/userActions";
import * as quizActions from "../../store/actions/quizActions";

import { withRouter } from "react-router-dom";

const UserQuizzes = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.fetchQuizzes());
  }, []);

  const handleOpenCreateQuiz = (quiz) => {
    dispatch(quizActions.setCurrentQuiz(quiz));
    props.history.push("/createQuiz");
  };

  const quizzes = useSelector((state) => state.user.quizzes);
  console.log(quizzes);

  const handleDeleteQuiz = (id) => {
    console.log("delete quiz");
    dispatch(userActions.deleteQuiz(id));
  };

  return (
    <div className="userQuizzes">
      <h1>My Quizzes</h1>
      <ul>
        {quizzes.map((quiz, index) => (
          <li
            key={index}
            style={{ border: "2px solid black", cursor: "pointer" }}
          >
            <div onClick={() => handleOpenCreateQuiz(quiz)}>
              <h2>{quiz.quizName}</h2>
              <p>
                {quiz.quizPublished ? "" : "Unpublished - click to continue"}
              </p>
            </div>
            <button onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withRouter(UserQuizzes);
