const mongoose = require('mongoose');

const detailsSchema = [String];

const educationSchema = new mongoose.Schema({
  educationYears: String,
  institution: String,
  diploma: String,
  details: detailsSchema
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  experienceYears: String,
  position: String,
  company: String,
  details: detailsSchema
}, { _id: false });

// Define the PDFContaint schema
const pdfContaintSchema = new mongoose.Schema({
  skillsArray: [String],
  educationArray: [educationSchema],
  experienceArray: [experienceSchema],
  languages: [String]
}, { _id: false });

// Define the Candidacy schema
const candidacySchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  pdfContaint: pdfContaintSchema,
  average_candidacy: Number,
  profile_candidate: String,
  numberOfYears: Number
}, { collection: 'candidacy' });

// Create the Candidacy model
const Candidacy = mongoose.model('Candidacy', candidacySchema);

module.exports = Candidacy;