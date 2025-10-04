import { ApiProperty } from '@nestjs/swagger';

export class AssetResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty({ nullable: true })
  updated_at?: Date;
}
