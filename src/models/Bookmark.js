const { model, Schema } = require("mongoose");

const BookmarkScheema = new Schema(
  {
    jobId: { type: String },
    userEmail: { type: String },
    markDate: { type: Date },
  },
  {
    versionKey: false,
  }
);

const Bookmark = model("bookmarks", BookmarkScheema);

module.exports = Bookmark;
