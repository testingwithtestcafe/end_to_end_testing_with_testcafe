import { Selector } from "testcafe";

class ManageDataPageModel {
  constructor() {
    this.deleteFeedDataButton = Selector("#delete_feed_data_btn");
    this.deleteQuestionsButton = Selector("#delete_questions_btn");
    this.deleteConversationsButton = Selector("#delete_conversations_btn");
  }
}

export default new ManageDataPageModel();
