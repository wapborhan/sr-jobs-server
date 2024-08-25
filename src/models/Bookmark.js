const { model, Schema } = require("mongoose");

const BookmarkScheema = new Schema(
  {
    compLogoUrl: { type: String },
    compName: { type: String },
    compNumber: { type: String },
    compEmail: { type: String },
    compCategories: { type: String },
    compWebsite: { type: String },
    compAdress: { type: String },
    compDetails: { type: String },
    social: { type: Object },
  },
  {
    versionKey: false,
  }
);

const Bookmark = model("bookmarks", BookmarkScheema);

module.exports = Bookmark;
