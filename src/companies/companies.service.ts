import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find({ relations: ['funcionarios'] });
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id }, relations: ['funcionarios'] });
    if (!company) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
    }
    return company;
  }

  async create(companyData: Partial<Company>): Promise<Company> {
    const company = this.companyRepository.create(companyData);
    return await this.companyRepository.save(company);
  }

  async update(id: number, companyData: Partial<Company>): Promise<Company> {
    const company = await this.findOne(id);
    Object.assign(company, companyData);
    return await this.companyRepository.save(company);
  }

  async remove(id: number): Promise<void> {
    const company = await this.findOne(id);
    await this.companyRepository.remove(company);
  }
  
}
