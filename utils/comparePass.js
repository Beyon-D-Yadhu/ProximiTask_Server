import bcrypt from "bcryptjs";

export const comparePass = (original,hash)=>{
    return bcrypt.compare(original,hash)
}