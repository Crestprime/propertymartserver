import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type LandDocument = HydratedDocument<Land>;

@Schema()
@Exclude()
export class Land {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: SchemaTypes.String, unique: true })
  title: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  address: string;

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
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Prop({
    type: SchemaTypes.String,
    trim: true,
  })
  city: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  description: string;

  @ApiProperty()
  @Type(() => Array<string>)
  @IsNotEmpty()
  @Expose()
  @Prop({ type: [SchemaTypes.String] })
  images: string[];

  @ApiProperty()
  @Type(() => Array<string>)
  @IsNotEmpty()
  @Expose()
  @Prop({ type: [SchemaTypes.String] })
  features: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: SchemaTypes.String })
  plot_diagram: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: SchemaTypes.Boolean, default: false })
  sold_out: boolean;

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

export const LandScheam = SchemaFactory.createForClass(Land);
