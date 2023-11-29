import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private accountService: AccountService,
  ) { }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = new Payment();

    // TODO: Create a new payment using ethers module
    const fromAccount = await this.accountService.findOne(createPaymentDto.from);
    if (!fromAccount) {
      throw new NotFoundException(`Account with ID ${createPaymentDto.from} not found`);
    }

    const toAccount = await this.accountService.findOne(createPaymentDto.to);
    if (!toAccount) {
      throw new NotFoundException(`Account with ID ${createPaymentDto.to} not found`);
    }

    const provider = ethers.getDefaultProvider(process.env.ETHEREUM_RPC_URL);

    const signer = new ethers.Wallet(fromAccount.privateKey, provider);

    const transaction = {
      to: toAccount.publicKey,
      value: ethers.parseEther(createPaymentDto.amount.toString()),
    };

    const tx = await signer.sendTransaction(transaction);
    await tx.wait();

    payment.from = fromAccount;
    payment.to = toAccount;
    payment.amount = createPaymentDto.amount;
    payment.transactionHash = tx.hash;

    return await this.paymentsRepository.save(payment);
  }

  async findOne(id: number) {
    const user = await this.paymentsRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findAll() {
    return this.paymentsRepository.find();
  }
}
