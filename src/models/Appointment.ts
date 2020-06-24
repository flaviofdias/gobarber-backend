import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

/**
 * Um para Um - OneToOne
 * Um para Muitos - OneToMany
 * Muitos para Muitos - ManyToMany
 */

import User from './User'; // Relacionamento USER / USER_PROVIDER

// Declaração nome tabela
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  // Permite acessar todas informações do Usuário a partir da classe Appointments
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
