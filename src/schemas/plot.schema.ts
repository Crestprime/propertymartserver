import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PLOT_STATUS } from 'src/enums/plotStatus';

export type PlotDocument = HydratedDocument<Plot>;

@Schema()
@Exclude()
export class Plot {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Prop({ type: SchemaTypes.String, unique: true })
  land_id: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @Expose()
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  plot_size: string;

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
  plot_price: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Prop({
    type: SchemaTypes.String,
    trim: true,
    enum: PLOT_STATUS,
    default: PLOT_STATUS.AVAILABLE,
  })
  status: string;

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

export const PlotScheam = SchemaFactory.createForClass(Plot);
