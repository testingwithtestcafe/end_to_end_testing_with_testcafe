import applicationModel from "./models/application_model";
import { adminUser, regularUser } from "./helpers/roles";

fixture("TeamYap Adminstrator sections")
  .page("https://teamyap.app/feed");

test("TeamYap admin can see admin sections on the sidebar", async t => {
  await t.useRole(adminUser);

  await t
    .expect(applicationModel.sidebar.innerText)
    .contains("Organization Settings");
});

test("TeamYap user can't see admin sections on the sidebar", async t => {
  await t.useRole(regularUser);

  await t
    .expect(applicationModel.sidebar.innerText)
    .notContains("Organization Settings");
});

test("TeamYap admin can access organization settings", async t => {
  await t
    .useRole(adminUser)
    .click(applicationModel.orgSettingsLink);

  await t
    .expect(applicationModel.mainContent.innerText)
    .contains("Organization settings");
});