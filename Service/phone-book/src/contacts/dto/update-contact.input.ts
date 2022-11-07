import { CreateContactInput } from './create-contact.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateContactInput extends PartialType(CreateContactInput) {
  @Field(type => Int)
  Id : Number

  @Field()
  FirstName : String

  @Field()
  LastName : String

  @Field()
  Nickname : String

  @Field()
  Address: String

  @Field()
  Photo: String
}
