const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name should be between 4-50 Characters");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not Valid");
  }
};

const validateEditProfileData = (req,res) => {
    const AllowedEditFields = [
        "firstName",
        "lastName",
        "enailId",
        "age",
        "gender",
        "about",
        "photourl",
        "skills"
    ]

    const isEditAllowed = Object.keys(req.body).every(key => AllowedEditFields.includes(key));


    return isEditAllowed;
}

module.exports = { validateSignupData , validateEditProfileData};


