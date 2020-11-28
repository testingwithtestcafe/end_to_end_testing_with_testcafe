import { Selector } from "testcafe";

class FeedbackPageModel {
  constructor() {
    this.feedbackFrame = Selector("#feedback_frame");
    this.feedbackTextarea = Selector("#feedback");
    this.feedbackSubmitButton = Selector("#feedback_submit");
    this.successNotice = Selector(".feedback-submit-success");
    this.returnToFeedLink = Selector("a.return-to-feed-link");
  }
}

export default new FeedbackPageModel();
