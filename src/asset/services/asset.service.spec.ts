import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { prismaMock } from '../../../prisma/prisma.service.mock';
import { CreateAssetDto } from '../dto/createAsset.dto';
import { UpdateAssetDto } from '../dto/updateAsset.dto';
import { AssetResponseDto } from '../dto/responseAsset.dto';

describe('AssetService', () => {
  let service: AssetService;
  let prisma: PrismaService;

  const mockAsset: AssetResponseDto = {
    id: 11,
    name: 'Laptop HP 999',
    type: 'Celular',
    owner: 'Benito Perez',
    created_at: new Date('2025-10-05T15:21:14.707Z'),
    updated_at: null,
  };

  const mockAssetList: AssetResponseDto[] = [
    {
      id: 2,
      name: 'Tablet Samsung S25 ultra',
      type: 'Laptop',
      owner: 'Magali Bonansea',
      created_at: new Date('2025-10-04T17:44:09.819Z'),
      updated_at: null,
    },
    {
      id: 1,
      name: 'Alienware',
      type: 'Laptop',
      owner: 'Ruben Gustavo Altamiranda',
      created_at: new Date('2025-10-04T17:43:18.223Z'),
      updated_at: new Date('2025-10-04T17:44:59.486Z'),
    },
    mockAsset,
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<AssetService>(AssetService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  // ----------------- CREATE -----------------
  describe('create', () => {
    it('should create and return a new asset', async () => {
      const createDto: CreateAssetDto = {
        name: 'Laptop HP 999',
        type: 'Celular',
        owner: 'Benito Perez',
      };
      prismaMock.assets.create.mockResolvedValue(mockAsset);

      const result = await service.create(createDto);

      expect(prisma.assets.create).toHaveBeenCalledWith({
        data: createDto,
      });
      expect(result).toEqual(mockAsset);
    });
  });

  // ----------------- FIND ALL -----------------
  describe('findAll', () => {
    it('should return a list of assets', async () => {
      prismaMock.assets.findMany.mockResolvedValue(mockAssetList);

      const result = await service.findAll();

      expect(prisma.assets.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockAssetList);
    });
  });

  // ----------------- UPDATE -----------------
  describe('update', () => {
    it('should update and return the asset', async () => {
      const updateDto: UpdateAssetDto = {
        name: 'Laptop HP',
        type: 'Laptop ULTRA',
        owner: 'Juan Perez',
      };

      prismaMock.assets.findUnique.mockResolvedValue(mockAsset);
      prismaMock.assets.update.mockResolvedValue({
        ...mockAsset,
        ...updateDto,
      });

      const result = await service.update(11, updateDto);

      expect(prisma.assets.findUnique).toHaveBeenCalledWith({
        where: { id: 11 },
      });
      expect(prisma.assets.update).toHaveBeenCalledWith({
        where: { id: 11 },
        data: { ...updateDto, updated_at: expect.any(Date) },
      });
      expect(result).toEqual({ ...mockAsset, ...updateDto });
    });

    it('should throw NotFoundException if asset does not exist', async () => {
      prismaMock.assets.findUnique.mockResolvedValue(null);
      await expect(service.update(99, {} as UpdateAssetDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ----------------- REMOVE -----------------
  describe('remove', () => {
    it('should delete the asset and return success message', async () => {
      prismaMock.assets.findUnique.mockResolvedValue(mockAsset);
      prismaMock.assets.delete.mockResolvedValue(mockAsset);

      const result = await service.remove(11);

      expect(prisma.assets.findUnique).toHaveBeenCalledWith({
        where: { id: 11 },
      });
      expect(prisma.assets.delete).toHaveBeenCalledWith({ where: { id: 11 } });
      expect(result).toBe('Asset correctamente eliminado');
    });

    it('should throw NotFoundException if asset does not exist', async () => {
      prismaMock.assets.findUnique.mockResolvedValue(null);
      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
    });
  });
});
