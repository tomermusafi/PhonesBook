import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Contact } from 'src/contacts/entities/contact.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Phone {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    Id: number
    
    @Column()
    @Field()
    Phone : String

    @Column()
    @Field(type => Int)
    ContactId: number

    @ManyToOne(() => Contact, contact => contact.Phones)
    @Field(type => Contact)
    Contact: Contact;
}
