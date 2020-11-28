import feedbackPageModel from "./models/feedback_page_model";
import feedPageModel from "./models/feed_page_model";
import { regularUser } from "./helpers/roles";

fixture("TeamYap Feedback")
  .page("https://teamyap.app/feedback")
  .beforeEach(async t => {
    await t
      .useRole(regularUser)
      .navigateTo("https://teamyap.app/feedback");
  });

test("Regular user can submit feedback to the TeamYap organization admin", async t => {
  await t
    .switchToIframe(feedbackPageModel.feedbackFrame);

  await t
    .typeText(feedbackPageModel.feedbackTextarea, "This is my feedback")
    .click(feedbackPageModel.feedbackSubmitButton);

  await t
    .expect(feedbackPageModel.successNotice.exists)
    .ok();

  await t.switchToMainWindow();

  await t
    .click(feedbackPageModel.returnToFeedLink);

  await t
    .expect(feedPageModel.postTextarea.exists)
    .ok();
});
