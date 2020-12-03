import conversationPageModel from "./models/conversation_page_model";
import popoutConversationPageModel from "./models/popout_conversation_page_model";
import manageDataPageModel from "./models/manage_data_page_model";
import { adminUser } from "./helpers/roles";

fixture("TeamYap Conversations")
  .page("https://teamyap.app/conversations")
  .beforeEach(async t => {
    await t
      .useRole(adminUser)
      .navigateTo("https://teamyap.app/conversations");
  })
  .afterEach(async t => {
    await t
      .navigateTo("https://teamyap.app/admin/manage_data")
      .click(manageDataPageModel.deleteConversationsButton);
  });

test("User can have a conversation with another user in their TeamYap organization", async t => {
  await t
    .click(conversationPageModel.newConversationButton)
    .click(conversationPageModel.newConversationUser);

  await t
    .typeText(conversationPageModel.messageInput, "Hi Jane!")
    .click(conversationPageModel.messageSubmitButton);

  await t
    .expect(conversationPageModel.currentConversation.innerText)
    .contains("Hi Jane!");
});

test("User can popout conversation in separate window", async t => {
  await t
    .click(conversationPageModel.newConversationButton)
    .click(conversationPageModel.newConversationUser);

  await conversationPageModel.sendNewMessage("Hi Jane!");

  await t
    .click(conversationPageModel.popoutConversationLink);

  await t
    .expect(popoutConversationPageModel.popoutConversation.innerText)
    .contains("Hi Jane!");

  await t.switchToParentWindow();

  await t
    .expect(conversationPageModel.popoutWindowActive.exists)
    .ok();

  await t.switchToPreviousWindow();

  await popoutConversationPageModel.sendNewMessage("Are you there?");

  await t
    .expect(popoutConversationPageModel.popoutConversation.innerText)
    .contains("Are you there?");

  await t
    .click(popoutConversationPageModel.closePopoutLink);

  await t
    .expect(conversationPageModel.popoutWindowActive.exists)
    .notOk();

  await t
    .expect(conversationPageModel.currentConversation.innerText)
    .contains("Are you there?");
})
