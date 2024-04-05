const mongoose = require("mongoose");
const schema = mongoose.Schema;

const CandidatureSchema = new schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  idOffer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",

    enum: ["pending", "rejected", "accepted"],
  },
  typeCandidature: {
    type: String,
    enum: ["Job", "Intership"],
  },

  cvUpload: {
    type: String,
  },
  motivationLetterUpload: {
    type: String,
  },
  telephoneNumber: {
    type: Number,
  },
  experience: {
    type: String,
  },
  intershipDuration: {
    type: String,
  },
  internshipType: {
    type: String,
    enum: ["PFE", "Summer Internship"],
  },
  levelStudy: {
    type: String,
    enum: ["Licence", "Master", "engineering"],
  },
  academicField: {
    type: String,
    enum: ["Business", "Computer Science"],
  },
});

const Candidature = mongoose.model("Candidature", CandidatureSchema);

module.exports = Candidature;
