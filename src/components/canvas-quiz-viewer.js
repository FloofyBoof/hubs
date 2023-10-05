import axios from "axios";

import { API_BASE_URL } from "../../api-config";

axios.defaults.baseURL = API_BASE_URL;

const COURSE_ID = 70814;

AFRAME.registerComponent("canvas-quiz-viewer", {
  init() {
    console.log(API_BASE_URL);
    console.log("Canvas Quiz Viewer: Hello World");

    this.getQuizData(COURSE_ID, 567161);
  },

  displayAnswer: function(answer, i) {
    const text = answer.text;

    const answerText = document.createElement("a-entity");
    answerText.setAttribute("text", `value: ${text}`);
    answerText.setAttribute("position", `0 ${-0.2 * (i + 1)} 0`);

    this.questionText.appendChild(answerText);
  },

  displayQuestion: function(question) {
    // Generate question text by stripping out HTML from API data
    const questionText = stripHtmlFromText(question.question_text);

    this.questionText = document.createElement("a-entity");
    this.questionText.setAttribute("text", `value: ${questionText}`);
    this.questionText.setAttribute("position", "0 -0.2 0");
    this.el.appendChild(this.questionText);

    // Generate answer text
    question.answers.forEach((answer, i) => {
      this.displayAnswer(answer, i);
    });
  },

  async getQuizData(courseId, quizId) {
    const response = await axios.get(`courses/${courseId}/quizzes/${quizId}`);
    const data = response.data;

    if (response.status != 200) {
      return;
    }

    const questions =
      await axios.get(`courses/${courseId}/quizzes/${quizId}/questions`);

    const questionsData = questions.data;

    const currentQuestionIndex = 0;

    // Generate quiz title
    this.titleText = document.createElement("a-entity");
    this.titleText.setAttribute("text", `value: ${data.title}`);
    this.el.appendChild(this.titleText);

    this.displayQuestion(questionsData[currentQuestionIndex]);
  }
});

function stripHtmlFromText(text) {
  const div = document.createElement("div");
  div.innerHTML = text;
  return div.textContent || div.innerText || "";
}