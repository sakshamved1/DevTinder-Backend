

const validateSignupData = (req) => {

    const {firstName, lastName, email, password} =  req.body;

    if (!firstName || !lastName) {
        throw new Error("Name should be between 4-50 Characters");
    }



}

module.exports = {validateSignupData};