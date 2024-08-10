import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuncionariosService } from './funcionario.service';
import { Funcionario } from './funcionario.entity';
import { Company } from 'src/companies/company.entity';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) {}

  @Get()
  async findAll(): Promise<Funcionario[]> {
    return this.funcionariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Funcionario> {
    return this.funcionariosService.findOne(id);
  }

  @Post()
  async create(@Body() funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    if (funcionarioData.company_id) {
      funcionarioData.company = { id: funcionarioData.company_id } as Company;
    }
    return this.funcionariosService.create(funcionarioData);
  }
  

  @Patch(':id')
  async update(@Param('id') id: number, @Body() funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    if (funcionarioData.company_id) {
      funcionarioData.company = { id: funcionarioData.company_id } as Company;
    }
    return this.funcionariosService.update(id, funcionarioData);
  }
  

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.funcionariosService.remove(id);
  }
}
