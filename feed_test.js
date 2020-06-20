import feedPageModel from "./models/feed_page_model";
import manageDataPageModel from "./models/manage_data_page_model";
import { adminUser } from "./helpers/roles";

fixture("TeamYap Feed")
  .page("https://teamyap.app/feed")
  .meta({ "type": "regression" })
  .beforeEach(async t => {
    await t.useRole(adminUser);
  })
  .afterEach(async t => {
    await t
      .navigateTo("https://teamyap.app/admin/manage_data")
      .click(manageDataPageModel.deleteFeedDataButton);
  });

test
  .meta({ "priority": "high" })
  ("Logged-in user can create new feed post", async t => {
    await feedPageModel.createNewPost("Welcome to TeamYap!");

    await t
      .expect(feedPageModel.firstFeedPost.innerText)
      .contains("Welcome to TeamYap!");
  });

test
  .meta({ "priority": "high" })
  ("Logged-in user can comment on feed post", async t => {
    await feedPageModel.createNewPost("Can someone leave a comment?");

    await t
      .expect(feedPageModel.firstFeedPost.innerText)
      .contains("Can someone leave a comment?");

    await feedPageModel.createNewComment("Here's a comment!");

    await t
      .expect(feedPageModel.postComments.innerText)
      .contains("Here's a comment!");
  });