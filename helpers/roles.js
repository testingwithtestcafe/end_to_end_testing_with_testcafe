import { Role } from "testcafe";

export const adminUser = Role("https://teamyap.app/login", async t => {
  await t
    .typeText("#email", "dennis@dennmart.com")
    .typeText("#password", "teamyap123")
    .click("#login_submit");
});

export const regularUser = Role("https://teamyap.app/login", async t => {
  await t
    .typeText("#email", "jane.smith@teamyap.app")
    .typeText("#password", "TeamYapUser1")
    .click("#login_submit");
});
