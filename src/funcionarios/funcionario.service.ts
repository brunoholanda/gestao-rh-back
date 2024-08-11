import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Funcionario } from './funcionario.entity';

interface PaginatedResult<T> {
  data: T[];
  total: number;
}

interface PaginationOptions {
  page: number;
  limit: number;
}

interface SearchOptions extends PaginationOptions {
  searchTerm: string;
  companyId: number;
}

@Injectable()
export class FuncionariosService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
  ) {}

  async findAllPaginated({ page, limit }: PaginationOptions): Promise<PaginatedResult<Funcionario>> {
    const [data, total] = await this.funcionarioRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  async search({ searchTerm, page, limit, companyId }: SearchOptions): Promise<PaginatedResult<Funcionario>> {
    const [data, total] = await this.funcionarioRepository.findAndCount({
      where: {
        nome: ILike(`%${searchTerm}%`),
        company: { id: companyId },
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  async findOne(id: number): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepository.findOne({ where: { id } });
    if (!funcionario) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado`);
    }
    return funcionario;
  }

  async create(funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    const funcionario = this.funcionarioRepository.create(funcionarioData);
    return await this.funcionarioRepository.save(funcionario);
  }

  async update(id: number, funcionarioData: Partial<Funcionario>): Promise<Funcionario> {
    const funcionario = await this.findOne(id);
    Object.assign(funcionario, funcionarioData);
    return await this.funcionarioRepository.save(funcionario);
  }

  async remove(id: number): Promise<void> {
    const funcionario = await this.findOne(id);
    await this.funcionarioRepository.remove(funcionario);
  }
}
