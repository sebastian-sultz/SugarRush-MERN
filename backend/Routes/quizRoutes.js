const express =require('express');
const { getQuestions, submitQuiz } = require('../Controllers/quizController.js');

const router = express.Router();

router.get('/questions', getQuestions);
router.post('/submit', submitQuiz);

module.exports = router;
