import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { provideCustomRepository } from 'src/common/util/custom-repository.util';
import { Category } from './entities/category.entity';
import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepository } from './repositoryies/category.repository';
import { RestaurantsResolver } from './restaurants.resolver';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Category])],
  providers: [
    RestaurantsResolver,
    RestaurantsService,
    provideCustomRepository(Category, CategoryRepository),
  ],
})
export class RestaurantsModule {}
