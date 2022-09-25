import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from './output.dto';

@InputType()
export class PaginationInput {
  @Field(() => Number)
  page: number;
}

@ObjectType()
export class PaginationOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  totalPages?: number;

  @Field(() => Number, { nullable: true })
  totalResults?: number;
}
