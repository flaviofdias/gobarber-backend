/**
 * Sobrescrevendo tipagens do Express
 * Disponibiliza ID do usuário para todas as rotas que utilizarem autenticação
 */

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
