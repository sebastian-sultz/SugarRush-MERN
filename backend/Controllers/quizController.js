const Question = require('../Models/Question.js');

// Get all quiz questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().select('-__v');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
};

// Calculate quiz result
const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const questions = await Question.find();

    let totalScore = 0;
    answers.forEach((answer, index) => {
      const question = questions[index];
      totalScore += question.weights[answer.optionIndex];
    });

    const maxScore = questions.length * 3;
    const percentage = (totalScore / maxScore) * 100;

    let result;
    if (percentage <= 25) {
      result = { status: 'green', label: 'Optimal Wellness' };
    } else if (percentage <= 60) {
      result = { status: 'yellow', label: 'Moderate Stress' };
    } else {
      result = { status: 'red', label: 'Professional Support Recommended' };
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error calculating result' });
  }
};

module.exports = { getQuestions, submitQuiz };
