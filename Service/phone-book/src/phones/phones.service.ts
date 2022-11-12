import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { Repository } from 'typeorm';
import { CreatePhoneInput } from './dto/create-phone.input';
import { UpdatePhoneInput } from './dto/update-phone.input';
import { Phone } from './entities/phone.entity';

@Injectable()
export class PhonesService {
  constructor(@InjectRepository(Phone) private phonesRepository: Repository<Phone>){}

  async create(createPhoneInput: CreatePhoneInput): Promise<Phone> {
    return await this.phonesRepository.save(createPhoneInput);
  }

  async findAll(): Promise<Phone[]> {
    return await this.phonesRepository.find();
  }

  async findPhonesByContactId(contactId: number): Promise<Phone[]>{
    return await this.phonesRepository.findBy({ContactId: contactId});
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
    return await this.phonesRepository.update(id,phone);
  }

  async remove(id: number): Promise<Phone> {
    const phone = await this.phonesRepository.findOneBy({Id: id});
    if(phone == null){
      throw new GraphQLError(`Phone with id ${id} does not exist.`);
    }
    return await this.phonesRepository.remove(phone);
  }
}
