import { Selector, t } from "testcafe";

class AdminQuestionsModel {
  constructor() {
    this.questionInput = Selector("#new_profile_question");
    this.addQuestionButton = Selector("#add_question_btn");
    this.profileQuestionsList = Selector("#profile_questions_list");
    this.profileQuestionsListItems = this.profileQuestionsList.find("li");

    this.firstQuestion = this.profileQuestionsList.find("li").nth(0);
    this.firstQuestionHandle = this.firstQuestion.find(".profile_question_handle");
    this.firstQuestionContent = this.firstQuestion.find(".profile_question_content");
  }

  async addQuestion(question) {
    await t
      .typeText(this.questionInput, question)
      .click(this.addQuestionButton);
  }
}

export default new AdminQuestionsModel();