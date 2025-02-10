import { Test, TestingModule } from '@nestjs/testing';
import { AgentWalletsService } from './agent-wallets.service';

describe('AgentWalletsService', () => {
  let service: AgentWalletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentWalletsService],
    }).compile();

    service = module.get<AgentWalletsService>(AgentWalletsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
