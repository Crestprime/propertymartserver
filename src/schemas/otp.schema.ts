import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type OtpDocument = HydratedDocument<Otp>;

@Schema()
@Exclude()
export class Otp {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: SchemaTypes.ObjectId })
  user_id: ObjectId;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({
    type: SchemaTypes.String,
  })
  type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({
    type: SchemaTypes.String,
  })
  code: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  @Prop({
    type: SchemaTypes.Boolean,
    default: false,
  })
  isExpired: boolean;

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

export const OtpSchema = SchemaFactory.createForClass(Otp);
