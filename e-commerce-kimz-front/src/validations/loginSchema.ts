import { z } from "zod";

const loginSchema = z.object({
  email : z.string().min(1 , {message: "Email is required"}).email(),
  password : z.string().min(6 , {message: "password must be at least 6 characters"})
})
type TLoginInputs = z.infer<typeof loginSchema>;

export {loginSchema , type TLoginInputs};