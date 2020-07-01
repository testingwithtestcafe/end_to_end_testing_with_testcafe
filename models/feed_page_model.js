import { Selector, t } from "testcafe";

class FeedPageModel {
  constructor() {
    this.postTextarea = Selector("#new_post_textarea");
    this.postSubmitButton = Selector("#new_post_submit");
    this.firstFeedPost = Selector("#feed_posts").nth(0);
    this.feedPosts = Selector(".feed-post");
    this.feedError = Selector(".feed-error");

    this.commentTextarea = this.firstFeedPost.find(".new-comment-textarea");
    this.commentSubmitButton = this.firstFeedPost.find(".new-comment-submit");
    this.postComments = this.firstFeedPost.find(".feed-post-comments");
  }

  async createNewPost(message) {
    await t
      .typeText(this.postTextarea, message)
      .click(this.postSubmitButton);
  }

  async createNewComment(message) {
    await t
      .typeText(this.commentTextarea, message)
      .click(this.commentSubmitButton);
  }
}

export default new FeedPageModel();