const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Quiz = new Schema(
  {
    name: String,
    subject: String,
    invites: [String],
    questions: [
      {
        questionType: String,
        question: String,
        media: [
          {
            mimeType: String,
            data: Schema.Types.Mixed,
            id: String,
          },
        ],
        answers: {
          trueFalseAnswer: String,
          multipleChoiceOptions: [String],
          multipleChoiceAnswer: String,
        },
      },
    ],
    timeLimit: Number,
    scores: [
      {
        studentId: String,
        results: [
          {
            question: Number,
            correct: Boolean,
          },
        ],
        overallScore: Number,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", Quiz);
