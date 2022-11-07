import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsResolver } from './contacts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { PhonesModule } from 'src/phones/phones.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), PhonesModule],
  providers: [ContactsResolver, ContactsService],
  exports: []
})
export class ContactsModule {}
