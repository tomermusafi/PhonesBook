import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { ContactsService } from 'src/contacts/contacts.service';
import { Contact } from 'src/contacts/entities/contact.entity';
import { Repository } from 'typeorm';
import { CreatePhoneInput } from './dto/create-phone.input';
import { UpdatePhoneInput } from './dto/update-phone.input';
import { Phone } from './entities/phone.entity';

@Injectable()
export class PhonesService {
  constructor(@InjectRepository(Phone) private phonesRepository: Repository<Phone>){}

  create(createPhoneInput: CreatePhoneInput): Promise<Phone> {
    return this.phonesRepository.save(createPhoneInput);
  }

  findAll(): Promise<Phone[]> {
    return this.phonesRepository.find();
  }

  findPhonesByContactId(contactId: number): Promise<Phone[]>{
    return this.phonesRepository.findBy({ContactId: contactId});
  }

   async findOne(id: number): Promise<Phone> {
    const phone = await this.phonesRepository.findOneBy({Id: id});
    if(phone == null){
      throw new GraphQLError(`Phone with id ${id} does not exist.`);
    }
    return phone;
  }

  async update(id: number, updatePhoneInput: UpdatePhoneInput) {
    const phone = await this.phonesRepository.findOneBy({Id: id});
    if(phone == null){
      throw new GraphQLError(`Phone with id ${id} does not exist.`);
    }
    if(updatePhoneInput.Phone != null){
      phone.Phone = updatePhoneInput.Phone;
    }
    return this.phonesRepository.update(id,phone);
  }

  async remove(id: number): Promise<Phone> {
    const phone = await this.phonesRepository.findOneBy({Id: id});
    if(phone == null){
      throw new GraphQLError(`Phone with id ${id} does not exist.`);
    }
    return this.phonesRepository.remove(phone);
  }
 
}
