import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository(); // Chamada do service
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('Deve permitir criar um novo agendamento', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '111222',
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('Não deve permitir criar 2 agendamentos ou mais, no mesmo horário', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '111222',
      provider_id: '123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '111222',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
