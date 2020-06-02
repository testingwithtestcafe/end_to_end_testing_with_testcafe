import applicationModel from "./models/application_model";
import loginPageModel from "./models/login_page_model";

fixture("TeamYap Login").page("https://teamyap.app/login");

test("User with valid account can log in", async (t) => {
  await loginPageModel.submitLoginForm(
    "dennis@dennmart.com",
    "teamyap123"
  );

  await t
    .expect(applicationModel.sidebar.innerText)
    .contains("Dennis Martinez");
});
