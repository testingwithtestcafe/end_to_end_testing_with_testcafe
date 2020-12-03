import { Selector, t } from "testcafe";

class ConversationPageModel {
  constructor() {
    this.newConversationButton = Selector("#conversations #new_conversation_btn");
    this.newConversationUser = Selector("#conversations .new-conversation-user").withText("Jane Smith");
    this.messageInput = Selector("#conversations #message_body");
    this.messageSubmitButton = Selector("#conversations #message_submit_btn");
    this.currentConversation = Selector("#conversations #current_conversation");
    this.popoutConversationLink = Selector("#conversations #popout_conversation_link");
    this.popoutWindowActive = Selector("#conversations #popout_window_active");
  }

  async sendNewMessage(message) {
    await t
      .typeText(this.messageInput, message)
      .click(this.messageSubmitButton);
  }
}

export default new ConversationPageModel();
