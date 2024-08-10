import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Company } from './companies/company.entity';
import { Funcionario } from './funcionarios/funcionario.entity';
import { FuncionariosModule } from './funcionarios/funcionario.module';
import { CompaniesModule } from './companies/companY.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Company, Funcionario],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    FuncionariosModule,
    CompaniesModule,
  ],
})
export class AppModule {}
