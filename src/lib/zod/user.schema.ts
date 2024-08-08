import { z } from "zod";

const parseDate = (val: string | Date) => {
  const parsedDate = new Date(val);
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
};

const userSchema = z.object({
  id: z.string(),
  name: z.string().max(50),
  email: z.string().email().max(60),
  password: z.string().max(60),
  isActive: z.boolean(),
  createdAt: z
    .union([z.date(), z.string()])
    .nullish()
    .transform((val) => (typeof val === "string" ? parseDate(val) : val)),
  updatedAt: z
    .union([z.date(), z.string()])
    .nullish()
    .transform((val) => (typeof val === "string" ? parseDate(val) : val)),
  deactivatedAt: z
    .union([z.date(), z.string()])
    .nullish()
    .transform((val) => (typeof val === "string" ? parseDate(val) : val)),
  deletedAt: z
    .union([z.date(), z.string()])
    .nullish()
    .transform((val) => (typeof val === "string" ? parseDate(val) : val)),
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
  isActive: true,
  createdAt: true,
  deactivatedAt: true,
  deletedAt: true,
});

const UserCreateResponseSchema = userSchema.pick({
  id: true,
  createdAt: true,
});

const UserDeleteResponseSchema = userSchema.pick({
  deactivatedAt: true,
});

type TUser = z.infer<typeof userSchema>;
type TUserCreate = z.infer<typeof userCreateSchema>;
type TUserLogin = z.infer<typeof userLoginSchema>;
type TUserEdit = z.infer<typeof userEditSchema>;
type TUserResponse = z.infer<typeof UserResponseSchema>;
type TUserEditResponse = z.infer<typeof UserEditResponseSchema>;
type TUserCreateResponse = z.infer<typeof UserCreateResponseSchema>;
type TUserDeleteResponse = z.infer<typeof UserDeleteResponseSchema>;

export {
  userCreateSchema,
  userLoginSchema,
  userEditSchema,
  UserResponseSchema,
  UserEditResponseSchema,
  UserCreateResponseSchema,
  UserDeleteResponseSchema,
  TUser,
  TUserCreate,
  TUserLogin,
  TUserEdit,
  TUserResponse,
  TUserEditResponse,
  TUserCreateResponse,
  TUserDeleteResponse,
};
