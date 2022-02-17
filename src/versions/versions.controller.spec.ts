import { Test, TestingModule } from '@nestjs/testing';
import { VersionsController } from './versions.controller';

describe('VersionsController', () => {
  let controller: VersionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersionsController],
    }).compile();

    controller = module.get<VersionsController>(VersionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
