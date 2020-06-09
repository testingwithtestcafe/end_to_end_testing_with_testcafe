import { Selector } from "testcafe";

class ApplicationModel {
  constructor() {
    this.sidebar = Selector("#sidebar");
    this.mainContent = Selector("main");
    this.toastNotification = Selector(".toast-notification-body");
    this.mobileMenuButton = Selector("#mobile_menu_btn");

    this.orgSettingsLink = Selector(".sidebar-link")
      .withText("Organization Settings").nth(1);
  }
}

export default new ApplicationModel();