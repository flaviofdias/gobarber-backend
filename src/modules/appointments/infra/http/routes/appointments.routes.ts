import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controller/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// Aplica autenticação JWT em todas as rotas
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
