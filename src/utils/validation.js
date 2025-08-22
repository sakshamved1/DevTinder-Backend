const validator = require('validator')

const validateSignupData = (req) => {

    const {firstName, lastName, email, password} =  req.body;

    if (!firstName || !lastName) {
        throw new Error("Name should be between 4-50 Characters");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid")
    }
    else if(!validator.isStrongPassword(password)) {
        throw new Error("Password is not Valid")
    }



}

module.exports = {validateSignupData};