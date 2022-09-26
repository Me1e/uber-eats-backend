import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  CreatePaymentInput,
  CreatePaymentOuput,
} from './entities/create-payment.dto';
import { GetPaymentsOutput } from './entities/get-payment.dto';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payments.service';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => CreatePaymentOuput)
  @Role(['Owner'])
  createPayment(
    @AuthUser()
    owner: User,
    @Args('input')
    createPaymentInput: CreatePaymentInput,
  ): Promise<CreatePaymentOuput> {
    return this.paymentService.createPayment(owner, createPaymentInput);
  }

  @Query(() => GetPaymentsOutput)
  @Role(['Owner'])
  getPayments(
    @AuthUser()
    user: User,
  ): Promise<GetPaymentsOutput> {
    return this.paymentService.getPayments(user);
  }
}
