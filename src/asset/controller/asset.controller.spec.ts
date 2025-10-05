import { Test, TestingModule } from '@nestjs/testing';
import { AssetResponseDto } from '../dto/responseAsset.dto';
import { AssetService } from '../services/asset.service';
import { AssetController } from './asset.controller';
import { CreateAssetDto } from '../dto/createAsset.dto';
import { UpdateAssetDto } from '../dto/updateAsset.dto';

describe('Asset Controller', () => {
  let controller: AssetController;
  let service: AssetService;

  const mockAsset: AssetResponseDto = {
    id: 1,
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

  const mockAssetService = {
    create: jest.fn().mockResolvedValue(mockAsset),
    findAll: jest.fn().mockResolvedValue(mockAssetList),
    update: jest
      .fn()
      .mockImplementation((id: number, dto: UpdateAssetDto) =>
        Promise.resolve({ ...mockAsset, ...dto, id }),
      ),
    remove: jest.fn().mockResolvedValue('Asset correctamente eliminado'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetController],
      providers: [
        {
          provide: AssetService,
          useValue: mockAssetService,
        },
      ],
    }).compile();
    controller = module.get<AssetController>(AssetController);
    service = module.get<AssetService>(AssetService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call assetService.create and return the cread asset', async () => {
      const createDto: CreateAssetDto = {
        name: 'Laptop HP 999',
        type: 'Celular',
        owner: 'Benito Perez',
      };

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockAsset);
    });
  });

  describe('getAll', () => {
    it('should call service.findAll and return the asset list', async () => {
      const result = await controller.getAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockAssetList);
    });
  });

  describe('update', () => {
    it('should call service.update and return updated asset', async () => {
      const updateDto: UpdateAssetDto = {
        name: 'Laptop HP',
        type: 'Laptop ULTRA',
        owner: 'Juan Perez',
      };
      const result = await controller.update(12, updateDto);
      expect(service.update).toHaveBeenCalledWith(12, updateDto);
      expect(result).toEqual({ ...mockAsset, ...updateDto, id: 12 });
    });
  });

  describe('remove', () => {
    it('should call service.remove and return success message', async () => {
      const result = await controller.remove(11);
      expect(service.remove).toHaveBeenCalledWith(11);
      expect(result).toEqual('Asset correctamente eliminado');
    });
  });
});
