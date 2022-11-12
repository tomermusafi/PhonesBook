import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Phone } from "src/phones/entities/phone.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
@ObjectType()
export class Contact{
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    Id : number

    @Column()
    @Field()
    FirstName : String

    @Column()
    @Field()
    LastName : String

    @Column()
    @Field()
    Nickname : String
    
    @Column({nullable: true})
    @Field({nullable: true})
    Name: String;

    @Column({nullable: true})
    @Field({nullable: true})
    Address: String

    @Column({nullable: true})
    @Field({nullable: true})
    Photo: String

    @OneToMany(() => Phone, phone => phone.Contact)
    @Field(type => [Phone], {nullable: true})
    Phones?: Phone[];

}
