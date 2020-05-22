import { Selector } from "testcafe";

fixture("TeamYap Login")
  .page("https://teamyap.app/login");

test("User with valid account can log in", async t => {
  await t
    .typeText("#email", "dennis@dennmart.com")
    .typeText("#password", "teamyap123");

  await t.click("#login_submit");

  await t
    .expect(Selector("#sidebar").innerText)
    .contains("Dennis Martinez");
});
