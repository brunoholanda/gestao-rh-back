import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from './company.entity';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Company> {
    return this.companiesService.findOne(id);
  }

  @Post()
  async create(@Body() companyData: Partial<Company>): Promise<Company> {
    return this.companiesService.create(companyData);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() companyData: Partial<Company>): Promise<Company> {
    return this.companiesService.update(id, companyData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.companiesService.remove(id);
  }
}
