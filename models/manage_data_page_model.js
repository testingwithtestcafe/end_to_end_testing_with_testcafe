import { Selector } from "testcafe";

class ManageDataPageModel {
  constructor() {
    this.deleteFeedDataButton = Selector("#delete_feed_data_btn");
  }
}

export default new ManageDataPageModel();