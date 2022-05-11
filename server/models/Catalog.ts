const mong = require("mongoose");

const CatalogSchema = new mong.Schema({
  className: {
    type: String,
    required: true,
  },
  grades: {
    type: Number,
    required: true,
  },
});

const Catalog = mong.model("CatalogData", CatalogSchema);
module.exports = Catalog;
