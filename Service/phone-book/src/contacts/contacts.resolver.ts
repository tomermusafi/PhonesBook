import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { Observable } from 'rxjs';
import { Phone } from 'src/phones/entities/phone.entity';

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Mutation(() => Contact)
  createContact(@Args('createContactInput') createContactInput: CreateContactInput): Observable<Contact> {
    return this.contactsService.create(createContactInput);
  }

  @Query(() => [Contact], { name: 'allContacts' })
  findAll(
    @Args('take', { type: () => Int }) take: number, 
    @Args('skip', { type: () => Int }) skip: number): Promise<Contact[]> {
    return this.contactsService.findAll(take, skip);
  }
  @Query(() => [Contact], { name: 'contacts' })
  findAllLikeName(
    @Args('input') input: String,
    @Args('take', { type: () => Int }) take: number, 
    @Args('skip', { type: () => Int }) skip: number
  ): Promise<Contact[]>{
    return this.contactsService.findAllLikeName(input, take, skip);
  }
  @Query(() => Contact, { name: 'contact' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Contact> {
    return this.contactsService.findOne(id);
  }

  @Mutation(() => Contact)
  updateContact(@Args('updateContactInput') updateContactInput: UpdateContactInput) {
    return this.contactsService.update(Number(updateContactInput.Id), updateContactInput);
  }

  @Mutation(() => Contact)
  removeContact(@Args('id', { type: () => Int }) id: number): Promise<Contact> {
    return this.contactsService.remove(id);
  }

  @ResolveField(() => [Phone])
  getContactPhones(@Parent() contact: Contact): Promise<Phone[]>{
    return this.contactsService.getContactPhones(contact.Id)
  }
}
