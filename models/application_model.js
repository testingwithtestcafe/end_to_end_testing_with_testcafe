import { Selector } from "testcafe";

class ApplicationModel {
  constructor() {
    this.sidebar = Selector("#sidebar");
    this.mainContent = Selector("main");

    this.orgSettingsLink = Selector(".sidebar-link")
      .withText("Organization Settings").nth(1);
  }
}

export default new ApplicationModel();