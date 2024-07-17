import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const userCreateSchema = z.object({
  name: z
    .string({ required_error: "Name field is mandatory" })
    .min(5, { message: "Name needs at least 5 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  email: z
    .string({ required_error: "Email field is mandatory" })
    .email({ message: "Email must be valid" }),
  password: z
    .string({ required_error: "Password field is mandatory" })
    .min(8, { message: "Password needs at least 8 characters" })
    .max(60, { message: "Password cannot exceed 60 characters" })
    .regex(/(?=.*?[A-Z])/, "Password must have at least one capital letter")
    .regex(/(?=.*?[a-z])/, "Password must have at least one lowercase letter")
    .regex(/(?=.*?[0-9])/, "Password must have at least one number")
    .regex(
      /(?=.*?[#?!@$%^&*-])/,
      "Password must have at least one special character"
    ),
});

const userLoginSchema = z.object({
  email: z
    .string({ required_error: "Email field is mandatory" })
    .email({ message: "Email must be valid" }),
  password: z.string({ required_error: "Password field is mandatory" }),
});

const UserResponseSchema = userSchema.omit({
  name: true,
  email: true,
  password: true,
});

type TUserCreate = z.infer<typeof userCreateSchema>;
type TUserLogin = z.infer<typeof userLoginSchema>;
type TUserCreateResponse = z.infer<typeof UserResponseSchema>;

export {
  userCreateSchema,
  userLoginSchema,
  UserResponseSchema,
  TUserCreate,
  TUserLogin,
  TUserCreateResponse,
};
