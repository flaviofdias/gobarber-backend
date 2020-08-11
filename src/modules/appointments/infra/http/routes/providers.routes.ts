import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controller/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

// Aplica autenticação JWT em todas as rotas
providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
