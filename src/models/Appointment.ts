import { uuid } from 'uuidv4';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Declaração nome tabela
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;

  // Omit, permite excluir variáveis
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
