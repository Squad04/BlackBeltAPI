import { celebrate, Joi, Segments } from "celebrate";

export const createRoleSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

export const showRoleSchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export const updateRoleSchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
  }),
});
