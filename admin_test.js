import { Selector } from "testcafe";
import { adminUser, regularUser } from "./helpers/roles";

fixture("TeamYap Adminstrator sections")
  .page("https://teamyap.app/feed");

test("TeamYap admin can see admin sections on the sidebar", async t => {
  await t.useRole(adminUser);

  await t
    .expect(Selector("#sidebar").innerText)
    .contains("Organization Settings");
});

test("TeamYap user can't see admin sections on the sidebar", async t => {
  await t.useRole(regularUser);

  await t
    .expect(Selector("#sidebar").innerText)
    .notContains("Organization Settings");
});

test("TeamYap admin can access organization settings", async t => {
  await t
    .useRole(adminUser)
    .click(Selector(".sidebar-link").withText("Organization Settings").nth(1));

  await t
    .expect(Selector("main").innerText)
    .contains("Organization settings");
});