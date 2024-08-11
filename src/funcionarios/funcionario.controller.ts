import { Controller, Get, Query, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { FuncionariosService } from './funcionario.service';
import { Funcionario } from './funcionario.entity';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) {}

  @Get()
  async findAll(
    @Query('page') page = 1, // Padrão para a primeira página
    @Query('limit') limit = 10, // Padrão de 10 itens por página
  ): Promise<{ data: Funcionario[]; total: number }> {
    limit = limit > 100 ? 100 : limit; // Limite máximo de 100 itens por página
    return this.funcionariosService.findAllPaginated({ page, limit });
  }

  @Get('search')
  async search(
    @Query('searchTerm') searchTerm: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('company_id') companyId: number,
  ): Promise<{ data: Funcionario[]; total: number }> {
    limit = limit > 100 ? 100 : limit;
    return this.funcionariosService.search({ searchTerm, page, limit, companyId });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Funcionario> {
    return this.funcionariosService.findOne(id);
  }

  @Post()
  async create(@Body() funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    return this.funcionariosService.create(funcionarioData);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    return this.funcionariosService.update(id, funcionarioData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.funcionariosService.remove(id);
  }
}
