import axios from "axios";
import { API_BASE_URL, API_KEY } from "../../api-config";

axios.defaults.baseURL = API_BASE_URL;

const COURSE_ID = 70814;

AFRAME.registerComponent("canvas-quiz-viewer", {
  init() {
    console.log("Canvas Quiz Viewer: Hello World");

    this.textElement2 = document.createElement("a-entity");
    this.textElement2.setAttribute("text", "value: This is the Canvas Quiz custom component");
    this.textElement2.setAttribute("position", "0 0.2 0");
    this.el.appendChild(this.textElement2);

    this.getQuizData(COURSE_ID, 567161);
  },

  async getQuizData(courseId, quizId) {
    const response = await axios.get(`courses/${courseId}/quizzes/${quizId}`);
    const data = response.data;

    if (response.status != 200) {
      return;
    }

    const questions = await axios.get(`courses/${courseId}/quizzes/${quizId}/questions`);
    const questionsData = questions.data;

    const currentQuestion = questionsData[0];

    // Generate quiz title
    this.titleText = document.createElement("a-entity");
    this.titleText.setAttribute("text", `value: ${data.title}`);
    this.el.appendChild(this.titleText);

    // Generate question text by stripping out HTML from API data
    const html = currentQuestion.question_text;
    const div = document.createElement("div");
    div.innerHTML = html;
    const questionText = div.textContent || div.innerText || "";

    this.questionText = document.createElement("a-entity");
    this.questionText.setAttribute("text", `value: ${questionText}`);
    this.questionText.setAttribute("position", "0 -0.2 0");
    this.el.appendChild(this.questionText);

  }
});