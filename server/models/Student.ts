const mong = require("mongoose");

const StudentSchema = new mong.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

const Student = mong.model("StudentData", StudentSchema);
export default Student;
