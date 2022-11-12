import { Module } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { PhonesResolver } from './phones.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  providers: [PhonesResolver, PhonesService],
  exports: [PhonesService]
})
export class PhonesModule {}
