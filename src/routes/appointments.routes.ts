import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../respositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

/*
 * ROTA -> Receber a requisição -> Chamar outro arquivo -> Devolver uma resposta
 */

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find(); // Busca todos registros

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date); // Transformação de dado - Converte String em Date

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
