import { Selector, t } from "testcafe";

class LoginPageModel {
  constructor() {
    this.emailField = Selector("#email");
    this.passwordField = Selector("#password");
    this.loginSubmitButton = Selector("#login_submit");
  }

  async submitLoginForm(email, password) {
    await t
      .typeText(this.emailField, email)
      .typeText(this.passwordField, password)
      .click(this.loginSubmitButton);
  }
}

export default new LoginPageModel();