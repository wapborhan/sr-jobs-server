const { model, Schema, mongoose } = require("mongoose");

const BookmarkScheema = new Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },
    bookmarkerEmail: {
      type: String,
      required: true,
    },
    markDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const Bookmark = model("bookmarks", BookmarkScheema);

module.exports = Bookmark;
