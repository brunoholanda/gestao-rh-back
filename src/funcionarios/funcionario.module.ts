import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionariosService } from './funcionario.service';
import { FuncionariosController } from './funcionario.controller';
import { Funcionario } from './funcionario.entity';
import { Company } from '../companies/company.entity';  // Certifique-se de que isso está correto
import { CompaniesModule } from 'src/companies/companY.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Funcionario]),
    CompaniesModule, // Certifique-se de que o módulo CompaniesModule está importado aqui
  ],
  providers: [FuncionariosService],
  controllers: [FuncionariosController],
})
export class FuncionariosModule {}
