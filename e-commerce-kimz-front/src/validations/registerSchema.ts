import { z } from "zod";

const registerSchema = z.object({
  firstName : z.string().min(1 , {message: "First Name is required"}),
  lastName : z.string().min(1 , {message: "last Name is required"}),
  email : z.string().min(1 , {message: "Email is required"}).email(),
  password : z.string().min(6 , {message: "password must be at least 6 characters"})
  .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {message: "Password should contain at least 1 special character"}),
  confirmPassword : z.string().min(1 , {message: "confirm Password is required"}),
}).refine(input => input.password === input.confirmPassword
   ,{message: "Confirm Password and password not match" , path :["confirmPassword"]})

type TRegisterInputs = z.infer<typeof registerSchema>;

export {registerSchema , type TRegisterInputs};