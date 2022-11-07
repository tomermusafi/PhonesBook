import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { PhonesService } from './phones.service';
import { Phone } from './entities/phone.entity';
import { CreatePhoneInput } from './dto/create-phone.input';
import { UpdatePhoneInput } from './dto/update-phone.input';
import { Contact } from 'src/contacts/entities/contact.entity';

@Resolver(() => Phone)
export class PhonesResolver {
  constructor(private readonly phonesService: PhonesService) {}

  @Mutation(() => Phone)
  createPhone(@Args('createPhoneInput') createPhoneInput: CreatePhoneInput): Promise<Phone> {
    return this.phonesService.create(createPhoneInput);
  }

  @Query(() => [Phone], { name: 'phones' })
  findAll(): Promise<Phone[]> {
    return this.phonesService.findAll();
  }

  @Query(() => Phone, { name: 'phone' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Phone> {
    return this.phonesService.findOne(id);
  }

  @Mutation(() => Phone)
  updatePhone(@Args('updatePhoneInput') updatePhoneInput: UpdatePhoneInput) {
    return this.phonesService.update(0, updatePhoneInput);
  }

  @Mutation(() => Phone)
  removePhone(@Args('id', { type: () => Int }) id: number) : Promise<Phone> {
    return this.phonesService.remove(id);
  }

  
}
