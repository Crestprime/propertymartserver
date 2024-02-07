import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
@Exclude()
export class Address {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: SchemaTypes.String, unique: true })
  user_id: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  @Prop({
    type: SchemaTypes.Boolean,
    required: true,
  })
  isDefault: boolean;

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
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: SchemaTypes.String })
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: SchemaTypes.String })
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: SchemaTypes.String })
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: SchemaTypes.String })
  street_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: SchemaTypes.String })
  postal_code: string;

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

export const AddressSchema = SchemaFactory.createForClass(Address);
