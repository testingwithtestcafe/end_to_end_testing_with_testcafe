import { Selector, t } from "testcafe";

class SettingsPageModel {
  constructor() {
    this.profilePictureInput = Selector("#profile_picture_input");
    this.clearPictureButton = Selector("#clear_profile_picture_btn");
  }

  async uploadProfilePicture(file) {
    await t.setFilesToUpload(this.profilePictureInput, file);
  }
}

export default new SettingsPageModel();