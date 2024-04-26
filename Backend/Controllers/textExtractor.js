const fs = require('fs');
const PDFParser = require('pdf-parse');
const Candidacy = require('../Models/candidacy');
const PDFContaint = require('../Models/PDFContaint');
const Experience = require('../Models/experience');
const Education = require('../Models/education');
const {uploadPDF} = require('../middleware/upload_cv');

const topCvAverage = async (req, res) => {
  try {
    const limit = parseInt(req.params.limit); // Parse the limit parameter from the URL
    // Retrieve the top candidacies with the highest average_candidacy
    const topCandidacies = await Candidacy.find().sort({ average_candidacy: -1 }).limit(limit);
    res.json(topCandidacies); // Send the top candidacies as a JSON response
  } catch (error) {
    console.error('Error fetching top candidacies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const uplodCv = async(req,res) =>{
    try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const uploadedFilePath = await uploadPDF(req.file);
    console.log("PDF file uploaded successfully:", uploadedFilePath);
    res.send('PDF file uploaded successfully');
  } catch (error) {
    console.error("Error uploading PDF file:", error);
    res.status(500).send('Error uploading PDF file');
  }

}
const extractTextAndContactInfoFromPDF = async (req,res) => {
    try {
      // const nameFile = req.body
      // const pdfFilePath = path.join(__dirname, 'uploads', nameFile);
      // console.log("pdfFilePath", pdfFilePath)
      const pdfUrl = req.body.pdfUrl;
      let candidacyObject;
      let profile_cadidate = "";
      let language_average = 0;
      let skills_average = 0;
      let experience_average = 0;
      let profileAverage = 0;
      let average_candidacy = 0;
  
      const pdfData = fs.readFileSync(pdfUrl);
      const pdf = await PDFParser(pdfData);
      const pdfText = pdf.text;
  
      const { name, email, phoneNumber } = extractContactInfoFromText(pdfText);
      const skills_section = extractSkillsFromPDF(pdfText);
      const experience = extractExperienceSubsectionsFromPDF(pdfText);
      const educationSection = extractEducationSubsectionsFromPDF(pdfText);
      const languages = extractLanguagesFromPDF(pdfText);
  
      if (languages.length === 1) {
        language_average = 8;
      } else if (languages.length === 2) {
        language_average = 14;
      } else if (languages.length === 3) {
        language_average = 18;
      } else if (languages.length >= 4) {
        language_average = 20;
      }
  
      const frontEndTechnologies = [];
      const backEndTechnologies = [];
      const devOpsTechnologies = [];
      const blockChainTechnologies = [];
  
      skills_section.forEach(skill => {
        if (['React', 'Vue.js', 'JavaScript', 'HTML', 'CSS', 'Angular'].includes(skill)) {
          frontEndTechnologies.push(skill);
        } else if (['Spring Boot', 'Node JS', 'Express JS', 'TypeScript', 'Django', 'Flask', 'Spring Cloud', 'Java',
          'Python', 'Golan', 'Solidity'].includes(skill)) {
          backEndTechnologies.push(skill);
        } else if (['Kubernetes', 'Jenkins', 'Docker', 'Git', 'Docker-compose', 'Sonarqube', 'Junit'].includes(skill)) {
          devOpsTechnologies.push(skill);
        } else if (['Hyperledger Fabric', 'Ethereum'].includes(skill)) {
          blockChainTechnologies.push(skill);
        }
      });
  
      if (skills_section.includes('Kubernetes')) {
        devOpsTechnologies.push('Kubernetes');
      }
  
      const hasFrontEnd = frontEndTechnologies.length > 0;
      const hasBackEnd = backEndTechnologies.length > 0;
      const hasDevOps = devOpsTechnologies.length > 0;
      const hasBlockchain = blockChainTechnologies.length > 0;
  
      if (hasFrontEnd && hasBackEnd && hasDevOps && hasBlockchain) {
        profile_cadidate = 'Full Stack DevOps Blockchain';
        profileAverage = 20;
      }
      if (hasFrontEnd && hasBackEnd && hasDevOps) {
        profile_cadidate = 'Full Stack DevOps';
        profileAverage = 18;
      } else if (hasFrontEnd && hasBackEnd) {
        profile_cadidate = 'Full Stack';
        profileAverage = 16;
      } else if (hasBackEnd && hasDevOps) {
        profile_cadidate = 'Backend DevOps';
        profileAverage = 15;
      } else if (hasFrontEnd) {
        profile_cadidate = 'Front End';
        profileAverage = 12;
      } else {
        profile_cadidate = 'Unknown';
      }
  
      const profileArray = [...frontEndTechnologies, ...backEndTechnologies, ...devOpsTechnologies, ...blockChainTechnologies];
      const commonElements = skills_section.filter(element => profileArray.includes(element));
      const similarityPercentage = (commonElements.length / skills_section.length) * 100;
  
      if (similarityPercentage === 100) {
        skills_average = 20;
      } else if (similarityPercentage >= 80 && similarityPercentage < 90) {
        skills_average = 18;
      } else if (similarityPercentage >= 70 && similarityPercentage < 80) {
        skills_average = 16;
      } else if (similarityPercentage >= 60 && similarityPercentage < 70) {
        skills_average = 13;
      } else if (similarityPercentage === 50) {
        skills_average = 10;
      } else {
        skills_average = 8;
      }
  
      console.log(' skills_section: ', skills_section);
      console.log(' : ', skills_section.length);
      console.log("commonElements : ", commonElements);
      console.log("commonElements.length : ", commonElements.length);
      console.log("Similarity Percentage: ", similarityPercentage);
      console.log("Skills Average:", skills_average);
  
      console.log("Profile:", profile_cadidate);
  
      let numberOfYears = 0;
      let experience_numberOfYears = 0;
  
      experience.forEach((experience, index) => {
        const { experienceYears, position, details } = experience;
        const [startYear, endYear] = experienceYears.split('/').map(year => parseInt(year));
        const numberOfYear = endYear - startYear;
        numberOfYears += numberOfYear;
  
        if (numberOfYears < 3) {
          experience_numberOfYears = 10;
        }
        if (numberOfYears === 3) {
          experience_numberOfYears = 15;
        }
        if (numberOfYears > 3) {
          experience_numberOfYears = 18;
        }
        if (numberOfYears >= 5) {
          experience_numberOfYears = 20;
        }
      });
      experience_average = (profileAverage + experience_numberOfYears * 2) / 3;
      average_candidacy = (language_average + skills_average * 2 + experience_average * 3) / 6;
  
      console.log('experience_average : ', experience_average);
      console.log('average_candidacy : ', average_candidacy);
      console.log('language_average : ', language_average);
      console.log('profileAverage : ', profileAverage);
  
      const pdfContaint = new PDFContaint(skills_section, educationSection, experience, languages);
  
      console.log("name : ", name);
      console.log("email : ", email);
      console.log("phoneNumber : ", phoneNumber);
      console.log("average_candidacy : ", average_candidacy);
      console.log("profile_cadidate : ", profile_cadidate);
      console.log("numberOfYears : ", numberOfYears);
  
      try {
        const savedCandidacy = await Candidacy.create({
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          pdfContaint: pdfContaint,
          average_candidacy: average_candidacy,
          profile_candidate: profile_cadidate,
          numberOfYears: numberOfYears
        });
        candidacyObject = savedCandidacy;
        if (savedCandidacy){
          res.status(201).json({ message: 'Candidacy saved successfully' });
         }
        console.log('Candidacy saved successfully:', savedCandidacy);
      } catch (err) {
        res.status(500).send('Error extracting text from PDF');
         console.error('Error saving Candidacy:', err);
      }
  
      return candidacyObject;
  
    } catch (error) {
      console.error('Error extracting text and contact information from PDF:', error);
      return '';
    }
  };
  
  const extractContactInfoFromText = (pdfText) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const phoneRegex = /\b\d{8}\b/;
  
    // Split the PDF text into lines
    const lines = pdfText.split('\n');
  
    // Initialize variables to store contact information
    let name = '';
    let email = '';
    let phoneNumber = '';
  
    // Iterate through each line to find the contact section
    for (let line of lines) {
      // Match email address
      const emailMatch = line.match(emailRegex);
      if (emailMatch) {
        email = emailMatch[0];
      }
  
      // Match phone number
      const phoneMatch = line.match(phoneRegex);
      if (phoneMatch) {
        phoneNumber = phoneMatch[0];
      }
  
      // Assume the remaining part of the line is the name
      if (!email && !phoneNumber) {
        name += line.trim() + ' ';
      }
  
      // Stop processing if both email and phone number are found
      if (email && phoneNumber) {
        break;
      }
    }
    name = name.trim();
  
    return { name, email, phoneNumber };
  };

  function extractSkillsFromPDF(pdfText) {
    // Find the index of the "SKILLS" section
    const skillsStartIndex = pdfText.toUpperCase().indexOf('SKILLS');
    if (skillsStartIndex === -1) {
      console.error('Skills section not found in the PDF text.');
      return ''; // Return an empty string if "SKILLS" section is not found
    }
    const skillsArray = [];
    
    const educationStartIndex = pdfText.toUpperCase().indexOf('EDUCATION', skillsStartIndex);
    const skillsSectionEndIndex = educationStartIndex !== -1 ? educationStartIndex : pdfText.length;
  
    // Extract the skills section text
    const skillsSection = pdfText.substring(skillsStartIndex, skillsSectionEndIndex).trim();
    
    const onlyAlphabets = skillsSection.replace(/[^a-zA-Z]/g, ' ');
    const words = onlyAlphabets.trim().split(/\s+/);

    for (let index = 1; index < words.length; index++) {
      const word = words[index];
      const nextWord = words[index + 1];
      
      if (word.trim() !== '') {
    
        if (word === 'Java' && nextWord === 'Script') {
          skillsArray.push(word + '' + nextWord);
          index++; // Skip the next word
        } else if (word === 'Node') {
          skillsArray.push(word + ' ' + 'JS');
          index++;
        } else if (word === 'Spring') {
          skillsArray.push(word + ' ' + 'Boot');
          index++;
        } else if (word === 'Nest') {
          skillsArray.push(word + ' ' + 'JS');
          index++;
        } else if (word === 'Express') {
          skillsArray.push(word + ' ' + 'JS');
          index++;
        } else if (word === 'Type'){
          skillsArray.push(word + '' + 'Script');
          index++;
        }else if (word === 'Hyperledger'){
          skillsArray.push(word + ' ' + 'Fabric');
          index++;
        }else{
          skillsArray.push(word);
        }
      }
    }

  return skillsArray;
  }

  function extractExperienceSubsectionsFromPDF(pdfText) {
    let experienceArray = [];
    const experienceStartIndex = pdfText.toUpperCase().indexOf('EXPERIENCE');
    const experienceEndIndex = pdfText.toUpperCase().indexOf('LANGUAGE');
    
    if (experienceStartIndex !== -1 && experienceEndIndex !== -1) {
        const experienceSection = pdfText.substring(experienceStartIndex + 'EXPERIENCE'.length, experienceEndIndex).trim();
        const experienceSubsections = experienceSection.match(/\d{4}\/\d{4}[^]+?(?=\d{4}\/\d{4}|$)/g) || [];
        
        const subsections = experienceSubsections.map(section => {
            const lines = section.trim().split('\n').map(line => line.trim()).filter(line => line !== '');
            const [yearsPosition, company] = lines[0].split(':').map(part => part.trim());
            const years = yearsPosition.split(':')[0].trim();
            const details = lines.slice(1);
            const experienceYears = years.match(/\d{4}\/\d{4}/)[0];
            const position = years.replace(experienceYears, '').trim();

            const experience = new Experience(experienceYears, position, company, details)
            experienceArray.push(experience);
            return experience;
        });

        experienceArray = subsections;
    }
    
    return experienceArray;
}
  
  function extractEducationSubsectionsFromPDF(pdfText) {
    let educationArray = [];
    const educationStartIndex = pdfText.toUpperCase().indexOf('EDUCATION');
    const educationEndIndex = pdfText.toUpperCase().indexOf('EXPERIENCE');
    
    if (educationStartIndex !== -1 && educationEndIndex !== -1) {
        const educationSection = pdfText.substring(educationStartIndex + 'EDUCATION'.length, educationEndIndex).trim();
        const educationSubsections = educationSection.match(/\d{4}\/\d{4}[^]+?(?=\d{4}\/\d{4}|$)/g) || [];
        
        const subsections = educationSubsections.map(section => {
          const lines = section.trim().split('\n').map(line => line.trim()).filter(line => line !== '');
          const [yearsInstitution, diploma] = lines[0].split(':').map(part => part.trim());
          const years = yearsInstitution.split(':')[0].trim();
          const details = lines.slice(1);
          const educationYears = years.match(/\d{4}\/\d{4}/)[0];
          const institution = years.replace(educationYears, '').trim();
      
          const education = new Education(educationYears, institution, diploma, details);
          
          educationArray.push(education); // Push the education object directly
          return education; // Return the education object
      });
    }
    
    return educationArray;
}

function extractLanguagesFromPDF(pdfText) {
  let languagesArray = [];
  const languageStartIndex = pdfText.toUpperCase().lastIndexOf('LANGUAGE');
  
  if (languageStartIndex !== -1) {
      const languageSection = pdfText.substring(languageStartIndex + 'LANGUAGE'.length).trim();
      const languageText = languageSection.replace(/[^a-zA-Z\s]/g, ''); // Remove special characters
      const languageWords = languageText.split(/\s+/); // Split by whitespace
      
      languagesArray = languageWords.filter(word => word.trim() !== ''); // Remove empty strings   
  }
  
  return languagesArray;
}
  
module.exports = { extractTextAndContactInfoFromPDF,uplodCv,topCvAverage };
