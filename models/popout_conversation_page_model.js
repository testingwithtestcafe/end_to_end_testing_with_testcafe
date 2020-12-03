import { Selector, t } from "testcafe";

class PopoutConversationPageModel {
  constructor() {
    this.popoutConversation = Selector("#popout_conversation");
    this.messageInput = Selector("#popout_conversation #message_body");
    this.messageSubmitButton = Selector("#popout_conversation #message_submit_btn");
    this.closePopoutLink = Selector("#popout_conversation #close_popout_link");
  }

  async sendNewMessage(message) {
    await t
      .typeText(this.messageInput, message)
      .click(this.messageSubmitButton);
  }
}

export default new PopoutConversationPageModel();
