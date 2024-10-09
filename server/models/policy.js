const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sections: [
    {
      heading: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Policy = mongoose.model("Policy", policySchema);
module.exports = Policy;

