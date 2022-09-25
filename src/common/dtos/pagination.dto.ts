import { Field } from '@nestjs/graphql';
import { CoreOutput } from './output.dto';

export class PaginationInput {
  @Field(() => Number)
  page: number;
}

export class PaginationOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  totalPages?: number;
}
