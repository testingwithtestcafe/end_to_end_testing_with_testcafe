import applicationModel from "./models/application_model";
import adminQuestionsModel from "./models/admin_questions_model";
import manageDataPageModel from "./models/manage_data_page_model";
import { adminUser, regularUser } from "./helpers/roles";

fixture("TeamYap Administrator sections")
  .page("https://teamyap.app/feed")
  .meta({ "type": "regression" });

test
  .meta({ "priority": "low" })
  ("TeamYap admin can see admin sections on the sidebar", async t => {
    await t.useRole(adminUser);

    await t
      .expect(applicationModel.sidebar.innerText)
      .contains("Organization Settings");
  });

test
  .meta({ "priority": "medium" })
  ("TeamYap user can't see admin sections on the sidebar", async t => {
    await t.useRole(regularUser);

    await t
      .expect(applicationModel.sidebar.innerText)
      .notContains("Organization Settings");
  });

test
  .meta({ "priority": "low" })
  ("TeamYap admin can access organization settings", async t => {
    await t
      .useRole(adminUser)
      .click(applicationModel.orgSettingsLink);

    await t
      .expect(applicationModel.mainContent.innerText)
      .contains("Organization settings");
  });

test
  .meta({ "priority": "medium" })
  ("TeamYap admin can add and sort profile questions", async t => {
    await t
      .useRole(adminUser)
      .navigateTo("https://teamyap.app/admin/manage_data")
      .click(manageDataPageModel.deleteQuestionsButton);

    await t
      .navigateTo("https://teamyap.app/admin/profile_questions");

    await adminQuestionsModel.addQuestion("Question #1");

    await adminQuestionsModel.addQuestion("Question #2");

    await t
      .expect(adminQuestionsModel.profileQuestionsListItems.count)
      .eql(2);

    await t
      .expect(adminQuestionsModel.firstQuestionContent.innerText)
      .contains("Question #1");

    await t.drag(adminQuestionsModel.firstQuestionHandle, 0, 75, {
      speed: 0.5
    });

    await t
      .expect(adminQuestionsModel.firstQuestionContent.innerText)
      .contains("Question #2");
  })