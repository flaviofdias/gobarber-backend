/*
 * Métodos permitidos para Classes de Controller
 * index - Retorna lita de itens
 * show - Retorna 1 item
 * create - Cria 1 item
 * update - Atualiza todos os campos de 1 item
 * delete - Exclui o item
 */

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // delete user.password;

    return response.json(classToClass(user));
  }
}
