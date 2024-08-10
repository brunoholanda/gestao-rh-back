import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionario } from './funcionario.entity';

@Injectable()
export class FuncionariosService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
  ) {}

  async findAll(): Promise<Funcionario[]> {
    return await this.funcionarioRepository.find();
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
