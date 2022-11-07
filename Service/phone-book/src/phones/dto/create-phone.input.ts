import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePhoneInput {
  @Field()
  Phone : String
  @Field(type => Int)
  ContactId: number
}
