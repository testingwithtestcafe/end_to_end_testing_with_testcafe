import { RequestLogger, RequestMock } from "testcafe";

import feedPageModel from "./models/feed_page_model";
import manageDataPageModel from "./models/manage_data_page_model";
import { adminUser } from "./helpers/roles";

const commentLogger = RequestLogger({
  url: /\/api\/posts\/(\d+)\/comments/,
  method: "post"
});

const feedResponse = [
  {
    body: "This is the latest post shown on TeamYap",
    createdAt: "2020-05-25T20:32:19.154+09:00",
    recentPostComments: [],
    user: {
      name: "Dennis Martinez",
      profilePicture: "/packs/media/images/icons/avatar-3a690de84b67b1fe12b4486951cda785.svg"
    }
  },
  {
    body: "My first post on TeamYap!",
    createdAt: "2020-05-25T17:06:40.016+09:00",
    recentPostComments: [],
    user: {
      name: "Jane Smith",
      profilePicture: "/packs/media/images/icons/avatar-3a690de84b67b1fe12b4486951cda785.svg"
    }
  }
];

const feedMock = RequestMock()
  .onRequestTo({
    url: "https://teamyap.app/api/posts",
    method: "get"
  })
  .respond(feedResponse, 200);

const feedErrorMock = RequestMock()
  .onRequestTo({
    url: "https://teamyap.app/api/posts",
    method: "get"
  })
  .respond(null, 500);

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
  .requestHooks(commentLogger)
  .meta({ "priority": "high" })
  ("Logged-in user can comment on feed post", async t => {
    await feedPageModel.createNewPost("Can someone leave a comment?");

    await t
      .expect(feedPageModel.firstFeedPost.innerText)
      .contains("Can someone leave a comment?");

    await feedPageModel.createNewComment("Here's a comment!");

    await t
      .expect(commentLogger.contains(request => request.response.statusCode === 201))
      .ok();

    await t
      .expect(feedPageModel.postComments.innerText)
      .contains("Here's a comment!");
  });



test
  .requestHooks(feedMock)
  ("Feed section automatically loads posts from the server", async t => {
    await t
      .expect(feedPageModel.feedPosts.count)
      .eql(2);

    await t
      .expect(feedPageModel.feedPosts.nth(0).innerText)
      .contains("This is the latest post shown on TeamYap");

    await t
      .expect(feedPageModel.feedPosts.nth(1).innerText)
      .contains("My first post on TeamYap!");
  });

test
  .requestHooks(feedErrorMock)
  ("Feed section shows an error if messages can't load", async t => {
  await t
    .expect(feedPageModel.feedError.exists)
    .ok();

  await t
    .removeRequestHooks(feedErrorMock)
    .addRequestHooks(feedMock)
    .navigateTo("https://teamyap.app/feed");

  await t
    .expect(feedPageModel.feedError.exists)
    .notOk()
    .expect(feedPageModel.feedPosts.count)
    .eql(2);;
});