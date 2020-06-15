import axios from "axios";
import { tokenConfig } from "./authActions";
import { store } from "../../App";

export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const CREATE_QUIZ = "CREATE_QUIZ";

export const addNewQuestion = (questionData) => {
  axios
    .post("/addQuestion", {})
    .then(() => {
      return {
        type: ADD_NEW_QUESTION,
        question: questionData,
      };
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteQuestion = (id) => {
  return {
    type: DELETE_QUESTION,
    id: id,
  };
};

export const createQuiz = (quizName, quizSubject) => {
  return (dispatch) => {
    const token = store.getState().auth.token;
    console.log("making axios call");
    axios
      .post(
        "http://localhost:5000/createQuiz",
        { quizName, quizSubject },
        tokenConfig(token)
      )
      .then((res) => {
        console.log("got id back " + res.data.quizId);
        console.log("dispatching action object to reducer");
        dispatch({
          type: CREATE_QUIZ,
          payload: {
            quizName,
            quizSubject,
            quizId: res.data.quizId,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
