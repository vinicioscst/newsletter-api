import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
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

const userEditSchema = userCreateSchema.partial();

const UserResponseSchema = userSchema.omit({
  password: true,
});

const UserEditResponseSchema = userSchema.omit({
  password: true,
  createdAt: true,
});

const UserCreateResponseSchema = userSchema.omit({
  name: true,
  email: true,
  password: true,
  updatedAt: true,
});

type TUser = z.infer<typeof userSchema>;
type TUserCreate = z.infer<typeof userCreateSchema>;
type TUserLogin = z.infer<typeof userLoginSchema>;
type TUserEdit = z.infer<typeof userEditSchema>;
type TUserResponse = z.infer<typeof UserResponseSchema>;
type TUserEditResponse = z.infer<typeof UserEditResponseSchema>;
type TUserCreateResponse = z.infer<typeof UserCreateResponseSchema>;

export {
  userCreateSchema,
  userLoginSchema,
  userEditSchema,
  UserResponseSchema,
  UserEditResponseSchema,
  UserCreateResponseSchema,
  TUser,
  TUserCreate,
  TUserLogin,
  TUserEdit,
  TUserResponse,
  TUserEditResponse,
  TUserCreateResponse,
};
