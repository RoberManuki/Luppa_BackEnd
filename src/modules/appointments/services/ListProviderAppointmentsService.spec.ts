// import AppError from '@shared/errors/AppError';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider appointments of an day ', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      user_id: 'fake_user_id',
      provider_id: 'fake_provider_id',
      date: new Date(2021, 4, 20, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      user_id: 'fake_user_id',
      provider_id: 'fake_provider_id',
      date: new Date(2021, 4, 20, 9, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'fake_provider_id',
      year: 2021,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
