import { Role } from "testcafe";
import loginPageModel from "../models/login_page_model";

export const adminUser = Role("https://teamyap.app/login", async (t) => {
  await loginPageModel.submitLoginForm(
    "dennis@dennmart.com",
    process.env.ADMIN_PASSWORD
  );
});

export const regularUser = Role("https://teamyap.app/login", async (t) => {
  await loginPageModel.submitLoginForm(
    "jane.smith@teamyap.app",
    process.env.REGULAR_PASSWORD
  );
});
