import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Funcionario } from '../funcionarios/funcionario.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  company_name: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  cnpj: string;

  @Column({ type: 'varchar', length: 255 })
  endereco: string;

  @Column({ type: 'varchar', length: 20 })
  telefone: string;

  @OneToMany(() => Funcionario, (funcionario) => funcionario.company)
  funcionarios: Funcionario[];
  users: any;
}
