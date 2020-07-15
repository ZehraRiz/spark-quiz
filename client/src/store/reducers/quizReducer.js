import {
  ADD_NEW_QUESTION,
  EDIT_QUESTION,
  DELETE_QUESTION,
  CREATE_QUIZ,
  SET_CURRENT_QUIZ,
  CLEAR_CURRENT_QUIZ,
  UPDATE_QUIZ,
  PUBLISH_QUIZ,
  RESET_CURRENT_QUIZ
} from "../actions/quizActions";

const initalState = {
  _id: "",
  quizName: "",
  quizSubject: "",
  quizQuestions: [],
  quizTimeLimit: "",
  quizPointsSystem: "",
  quizInvites: {
    contacts: [],
    groups: [],
    new: [],
  },
};

export default (state = initalState, action) => {
  switch (action.type) {
    case ADD_NEW_QUESTION:
    case EDIT_QUESTION:
      return {
        ...state,
        _id: action.payload._id,
        quizName: action.payload.quizName,
        quizSubject: action.payload.quizSubject,
        quizQuestions: action.payload.quizQuestions,
      };
    case DELETE_QUESTION:
      const updatedState = {
        ...state,
        quizQuestions: state.quizQuestions.filter(
          (question) => question._id !== action.id
        ),
      };
      return updatedState;
    case CREATE_QUIZ:
      return {
        ...state,
        ...action.payload,
      };
    case SET_CURRENT_QUIZ:
      localStorage.setItem("quizId", action.payload._id);
      return {
        ...state,
        ...action.payload,
      };
    case RESET_CURRENT_QUIZ:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_CURRENT_QUIZ:
      localStorage.removeItem("quizId");
      return {
        ...initalState,
      };
    case UPDATE_QUIZ:
      return {
        ...state,
        ...action.payload,
      };
    case PUBLISH_QUIZ:
      return {
        ...state,
      };
    default:
      return state;
  }
};
