import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from '../companies/company.entity';

@Entity('funcionarios')
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'date' })
  data_nascimento: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone: string;

  @Column({ type: 'varchar', length: 14, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  estado_civil: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cargo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  formacao_academica: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  endereco: string;

  @Column({ type: 'int', nullable: true })
  company_id: number;


  @ManyToOne(() => Company, (company) => company.funcionarios)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
