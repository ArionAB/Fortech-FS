const mong = require("mongoose");

const CatalogSchema = new mong.Schema({
  userID: {
    type: String,
    required: true,
  },
  className: {
    type: String,
  },
  grades: {
    type: String,
  },
});

const Catalog = mong.model("CatalogData", CatalogSchema);
export default Catalog;
