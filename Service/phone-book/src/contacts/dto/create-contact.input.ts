import { InputType, Int, Field } from '@nestjs/graphql';
import { Phone } from 'src/phones/entities/phone.entity';

@InputType()
export class CreateContactInput {
    @Field({nullable: true})
    FirstName? : String

    @Field({nullable: true})
    LastName? : String

    @Field({nullable: true})
    Nickname? : String

    @Field({nullable: true})
    Address? : String

    @Field({nullable: true})
    Photo? : String
}
