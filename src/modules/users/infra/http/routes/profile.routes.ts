import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate'; // Validação de dados

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated); // Acessível se estiver logado

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required,
      old_password: Joi.string(),
      password: Joi.string().required(), // Pode melhorar, tornando obrigatório quando o campo old_password existir
      password_confirmation: Joi.string().valid(Joi.ref('password')), // Pode melhorar, tornando obrigatório quando o campo old_password existir
    },
  }),
  profileController.update,
);

export default profileRouter;
