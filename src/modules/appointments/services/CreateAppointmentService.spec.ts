import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository(); // Chamada do service
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
      fakeNotificationsRepository,
    );
  });

  it('Deve permitir criar um novo agendamento', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2021, 4, 10, 13),
      user_id: '111222',
      provider_id: '222333',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('222333');
  });

  it('Não deve permitir criar 2 agendamentos ou mais, no mesmo horário', async () => {
    const appointmentDate = new Date(2021, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '111222',
      provider_id: '222333',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '111222',
        provider_id: '222333',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve permitir criar agendamentos em datas / horários passados', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 15).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 10, 8),
        user_id: '111222',
        provider_id: '222333',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve permitir criar agendamentos para o Prestador, sendo ele mesmo o usuário', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 7, 23, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 7, 23, 13),
        user_id: 'user-id',
        provider_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve permitir criar agendamentos antes das 8h ou depois das 17h', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 7, 23, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 7, 24, 7),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2021, 7, 24, 18),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
