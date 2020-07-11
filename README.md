# MAPEANDO FEATURES DO SISTEMA

# Recuperação de senha
**RF**
- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha

**RNF**
- Utilizar Mailtrap para testar envios em ambiente de dev;
- Uitlizar Amazon SES para envio em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**
- O link enviado por e-mail para resetar a senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar a senha;


# Atualização de perfil
**RF**
- O usuário deve poder atualizar seu nome, e-mail e senha;

**RNF**
**RN**
- O usuário não pode alterar seu e-mail para e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar a senha, o usuário deve informar a senha antiga;

# Painel do prestador
**RF**
- O usuário deve pode listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devems ser armazenadas no MongoDB;
- As notificaçõe do prestador devem ser enviadas em tempo-real utilizando Socket.io; (Semelhante ao Whatsapp)

**RN**
- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;


# Agendamento de serviços
**RF**
- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um novo prestador;

**RNF**
- Listagem de prestadores deve ser armazenada em cache; (Otimizar desempenho de processamento)

**RN**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar emn um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;


# LEGENDA
| RF  |  Requisitos Funcionais    |
| RNF | Requisitos Não Funcionais |
| RN  | Regras de Negócio         |

