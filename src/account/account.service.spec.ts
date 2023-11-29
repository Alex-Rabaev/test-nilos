import { Test, TestingModule } from '@nestjs/testing';
import { ethers } from 'ethers';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { User } from '../user/user.entity';

describe('AccountService', () => {
  let service: AccountService; // here we take real AccountService but it should be a MockAccountService for not creating real accounts blockchain

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should create an Ethereum account', async () => {

    // TODO: Create a new account using ethers module
    const mockUser = new User();
    mockUser.id = 1;
    mockUser.username = 'johndoe';
    mockUser.password = 'password123';

    const createAccountDto: CreateAccountDto = {
      user: mockUser,
    };

    const account = await service.createAccount(createAccountDto);

    expect(account.publicKey).toBeDefined();
    expect(account.privateKey).toBeDefined();
    expect(account.user).toEqual(mockUser);
  });
});
