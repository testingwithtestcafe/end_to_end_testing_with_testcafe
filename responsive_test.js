import applicationModel from "./models/application_model";
import { adminUser } from "./helpers/roles";

fixture("TeamYap Responsive Test")
  .page("https://teamyap.app/feed")
  .beforeEach(async t => {
    await t.useRole(adminUser);
  })

test("The application hides the sidebar when resizing viewport", async t => {
  await t.maximizeWindow();

  await t
    .expect(applicationModel.mobileMenuButton.visible)
    .notOk();

  await t.resizeWindow(375, 812);

  await t
    .expect(applicationModel.mobileMenuButton.visible)
    .ok();
});

