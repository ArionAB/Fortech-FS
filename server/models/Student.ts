const mong = require("mongoose");

const MarkSchema = new mong.Schema({
  className: {
    type: String,
  },
  grades: Number,
});

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
  mark: [MarkSchema],
});

const Student = mong.model("StudentData", StudentSchema);
export default Student;
