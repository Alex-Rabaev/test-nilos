import { Test, TestingModule } from '@nestjs/testing';
import { ethers } from 'ethers';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Account } from 'src/account/account.entity';

describe('PaymentService', () => {
  let service: PaymentService; // here we take real PaymentService but it should be a MockPaymentService 

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });


  it('should make a payment', async () => {
    // const fromAccount: Account = { id: 1, privateKey: '0x...', publicKey: '0x...', user: {
    //     id: 1, 
    //     username: 'johndoe',
    //     password: 'Password123'
    //   } 
    // }; 
    // const toAccount = { id: 2, publicKey: '0x...' };

    // jest.spyOn(service['accountService'], 'findOne').mockImplementation(async (id: number) => {
    //   if (id === fromAccount.id) return fromAccount;
    //   if (id === toAccount.id) return toAccount;
    //   return null;
    // });

    // const mockSendTransaction = jest.fn().mockResolvedValue({
    //   wait: jest.fn().mockResolvedValue({ hash: '0x123' }),
    // });
    // jest.spyOn(ethers.Wallet.prototype, 'sendTransaction').mockImplementation(mockSendTransaction);

    const createPaymentDto = new CreatePaymentDto();
    createPaymentDto.from = 1;
    createPaymentDto.to = 2;
    createPaymentDto.amount = 1;

    const result = await service.create(createPaymentDto);

    expect(result).toBeDefined();
    expect(result.from).toEqual(createPaymentDto.from);
    expect(result.to).toEqual(createPaymentDto.to);
    expect(result.amount).toEqual(createPaymentDto.amount);
    expect(result.transactionHash).toBeDefined();
    // next step - check balances of accounts
  });
});
