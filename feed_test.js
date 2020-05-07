import { Selector } from "testcafe";

fixture("TeamYap Feed")
  .page("https://teamyap.app/login");

test("Logged-in user can create new feed post", async t => {
  await t
    .typeText("#email", "dennis@dennmart.com")
    .typeText("#password", "teamyap123")
    .click("#login_submit");

  await t
    .typeText("#new_post_textarea", "Welcome to TeamYap!")
    .click("#new_post_submit");

  await t
    .expect(Selector("#feed_posts").nth(0).innerText)
    .contains("Welcome to TeamYap!");
});

test("Logged-in user can comment on feed post", async t => {
  await t
    .typeText("#email", "dennis@dennmart.com")
    .typeText("#password", "teamyap123")
    .click("#login_submit");

  await t
    .typeText("#new_post_textarea", "Can someone leave a comment?")
    .click("#new_post_submit");

  const postSelector = Selector("#feed_posts").nth(0);

  await t
    .expect(postSelector.innerText)
    .contains("Can someone leave a comment?");

  await t
    .typeText(postSelector.find(".new-comment-textarea"), "Here's a comment!")
    .click(postSelector.find(".new-comment-submit"));

  await t
    .expect(postSelector.find(".feed-post-comments").innerText)
    .contains("Here's a comment!");
});