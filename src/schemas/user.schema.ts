import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { IsString, IsArray, IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema()
@Exclude()
export class User {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: SchemaTypes.String })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  @Prop({
    type: SchemaTypes.String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    index: true,
  })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({
    type: SchemaTypes.String,
    trim: true,
    max: 15,
    min: 11,
  })
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Prop({
    type: SchemaTypes.String,
    trim: true,
  })
  password: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @Expose()
  @Prop({
    type: [SchemaTypes.String],
  })
  roles: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop()
  verification_level: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({
    type: SchemaTypes.Date,
    default: new Date().toISOString(),
    trim: true,
  })
  created_at: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({
    type: SchemaTypes.Date,
    default: new Date().toISOString(),
    trim: true,
  })
  updated_at: Date;
}

export const UserScheam = SchemaFactory.createForClass(User);
