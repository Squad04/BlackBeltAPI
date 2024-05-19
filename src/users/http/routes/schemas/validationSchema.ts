import { celebrate, Joi, Segments } from "celebrate";

export const createUserSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    roleId: Joi.string().uuid().optional(),
    isAdmin: Joi.boolean().optional(),
  }),
});

export const updateUserSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    oldPassword: Joi.string(),
    password: Joi.string().optional(),
    passwordConfirmation: Joi.string()
      .valid(Joi.ref("password"))
      .when("password", {
        is: Joi.exist(),
        then: Joi.required(),
      }),
  },
});

export const loginSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
