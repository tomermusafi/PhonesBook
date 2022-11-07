import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { from, observable, Observable } from 'rxjs';
import { Phone } from 'src/phones/entities/phone.entity';
import { PhonesService } from 'src/phones/phones.service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { Contact } from './entities/contact.entity';
import convertContactName from './utils/contact.convert';

@Injectable()
export class ContactsService {
  constructor(@InjectRepository(Contact) private contactRepository: Repository<Contact>, private PhoneService: PhonesService){}
  create(createContactInput: CreateContactInput): Observable<Contact> {
    const newContact = this.contactRepository.create(createContactInput);
    return from(this.contactRepository.save(convertContactName(newContact)));
  }

  findAll(take: number = 5, skip: number = 0): Observable<Contact[]> {
    take = take > 5 || take < 0 ? 5 : take;
    skip = skip >= 0 ? skip : 0;
    skip *= take;
    return from(
      this.contactRepository
        .createQueryBuilder('contact')
        .orderBy('contact.Name', 'DESC')
        .take(take)
        .skip(skip)
        .getMany()
    );
  }

  findAllLikeName(input: String, take: number = 5, skip: number = 0): Observable<Contact[]>{
    take = take > 5 || take < 0 ? 5 : take;
    skip = skip >= 0 ? skip : 0;
    skip *= take;
    return from(this.contactRepository
    .createQueryBuilder('contact')
    .where(`LOWER(contact.Name) like LOWER('${input}%')`)
    .orderBy('contact.Name', 'DESC')
    .take(take)
    .skip(skip)
    .getMany());
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOneBy({Id: id});
    if(contact == null){
      throw new GraphQLError(`Contact with id ${id} does not exist.`);
    }
    return contact;
  }

  async update(id: number, updateContactInput: UpdateContactInput) {
    const contact = await this.contactRepository.findOneBy({Id: id});
    if(contact == null){
      throw new GraphQLError(`Contact with id ${id} does not exist.`);
    }
    if(updateContactInput.Address != null){
      contact.Address = updateContactInput.Address;
    }
    if(updateContactInput.FirstName != null){
      contact.FirstName = updateContactInput.FirstName;
    }
    if(updateContactInput.LastName != null){
      contact.LastName = updateContactInput.LastName;
    }
    if(updateContactInput.Nickname != null){
      contact.Nickname = updateContactInput.Nickname;
    }
    if(updateContactInput.Photo != null){
      contact.Photo = updateContactInput.Photo;
    }
    return this.contactRepository.update(id,convertContactName(contact));
  }

  async remove(id: number): Promise<Contact>{
    const contact = await this.contactRepository.findOneBy({Id: id});
    if(contact == null){
      throw new GraphQLError(`Contact with id ${id} does not exist.`);
    }
    return this.contactRepository.remove(contact);
  }

  getContactPhones(contactId: number): Promise<Phone[]>{
    return this.PhoneService.findPhonesByContactId(contactId);
  }
}
