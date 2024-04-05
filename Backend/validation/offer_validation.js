const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidateUser(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : "";
    data.company = !isEmpty(data.company) ? data.company : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.location = !isEmpty(data.location) ? data.location : "";
    data.type = !isEmpty(data.type) ? data.type : "";

    data.startDate = !isEmpty(data.startDate) ? data.startDate : "";
    data.requirements = !isEmpty(data.requirements) ? data.requirements : "";
    data.salary = !isEmpty(data.salary) ? data.salary : "";
    data.experience = !isEmpty(data.experience) ? data.experience : "";
    data.createdBy = !isEmpty(data.createdBy) ? data.createdBy : "";
    

   
   
    if (validator.isEmpty(data.title)) {
      errors.title = "Required title";
    }
    if (validator.isEmpty(data.description)) {
      errors.description = "Required description";
    }
    if (validator.isEmpty(data.location)) {
      errors.location = "Required location";
    }
    if (validator.isEmpty(data.type)) {
      errors.type = "Required type";
    }
    if (validator.isEmpty(data.startDate)) {
        errors.startDate = "Required startDate";
      }


      if (!validator.isAfter(data.startDate)) {
        errors.startDate = " startDate will be after now";
      }

      if (validator.isEmpty(data.requirements)) {
        errors.requirements = "Required type";
      }
      
      if (validator.isEmpty(data.createdBy)) {
        errors.createdBy = "Required createdBy";
      }
  
    return {
        errors,
        isValid: isEmpty(errors)
    }
  };