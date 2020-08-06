import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('Deve permitir a atualização do avatar do usuário', async () => {
    const fakeUsersRepository = new FakeUsersRepository(); // Chamada do service
    const fakeStorageProvider = new FakeStorageProvider(); // Chamada do service

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatarTest.jpg',
    });

    expect(user.avatar).toBe('avatarTest.jpg');
  });

  it('Não deve permitir a atualização do avatar se o usuário não existir', async () => {
    const fakeUsersRepository = new FakeUsersRepository(); // Chamada do service
    const fakeStorageProvider = new FakeStorageProvider(); // Chamada do service

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatarTest.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve permitir a exclusão do avatar anterior e atualizar por um novo avatardo usuário', async () => {
    const fakeUsersRepository = new FakeUsersRepository(); // Chamada do service
    const fakeStorageProvider = new FakeStorageProvider(); // Chamada do service

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatarTest.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'UpdateAvatarTest.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatarTest.jpg'); // Deleta avatar antigo
    expect(user.avatar).toBe('UpdateAvatarTest.jpg'); // Atualiza avatar
  });
});
