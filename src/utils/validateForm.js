import validator from "validator";

export const checkValid = (email,password) => {

    const validEmail = validator.isEmail(email);
    if(!validEmail)return "Enter Valid Email";
    
    const validPassword = validator.isStrongPassword(password);
    if(!validPassword)return "Enter Valid Password"

    return null;
}