import React from "react";
import { useSelector } from "react-redux";
import "./QuizStart.css";

//this component is rendered as a child of Quiz
const QuizStart = ({ quiz, setQuizStarted }) => {
  return (
    <div className="quizStart__wrapper">
      <div className="quizStart__header">
        <h1>Quiz Name: {quiz.quizName}</h1>
      </div>
      <div className="quizStart__content">
        <div className="quizStart__info">
          <ul>
            <li>Author: {quiz.quizAuthor}</li>
            <li>Subject: {quiz.quizSubject}</li>
            <li>Time limit: {quiz.quizTimeLimit || "none"}</li>
            <button onClick={() => setQuizStarted(true)}>Start Quiz</button>
          </ul>
        </div>
        <div className="quizStart__scores">
          <div className="quizStart__table-wrapper">
            <h1>Scores</h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizStart;
