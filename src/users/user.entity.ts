import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;  // 

  @Column({ type: 'simple-array' })
  userType: string[];

  @Column()
  company_id: string;  // Certifique-se de que isso está correto
}
