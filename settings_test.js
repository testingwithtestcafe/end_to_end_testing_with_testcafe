import applicationModel from "./models/application_model";
import settingsPageModel from "./models/settings_page_model";
import { adminUser } from "./helpers/roles";

fixture("TeamYap Settings")
  .page("https://teamyap.app/settings")
  .beforeEach(async t => {
    await t
      .useRole(adminUser)
      .navigateTo("https://teamyap.app/settings");
  });

test("User can update and delete their profile picture", async t => {
  await settingsPageModel.uploadProfilePicture(
    "file_uploads/teamyap_profile_pic.jpg"
  );

  await t
    .expect(applicationModel.toastNotification.innerText)
    .contains("Your profile picture was successfully updated");

  await t
    .expect(settingsPageModel.clearPictureButton.exists)
    .ok();

  await t.click(settingsPageModel.clearPictureButton);

  await t
    .expect(applicationModel.toastNotification.innerText)
    .contains("Your profile picture was removed");

  await t
    .expect(settingsPageModel.clearPictureButton.exists)
    .notOk();
});
