import { CreatePhoneInput } from './create-phone.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePhoneInput extends PartialType(CreatePhoneInput) {
  @Field(type => Int)
  Id: number
  @Field({nullable: true})
  Phone : String
  @Field(type => Int , {nullable: true})
  ContactId: number
}
