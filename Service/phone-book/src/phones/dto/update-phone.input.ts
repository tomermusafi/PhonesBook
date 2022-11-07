import { CreatePhoneInput } from './create-phone.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePhoneInput extends PartialType(CreatePhoneInput) {
  @Field()
  Phone : String
  @Field(type => Int)
  ContactId: number
}
