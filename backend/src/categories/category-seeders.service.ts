import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategorySeederService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async seed() {
    const categories = [
      { name: 'Food & Beverage' },
      { name: 'Cleaning Supplies' },
      { name: 'Snack' },
      { name: 'Spices' },
      { name: 'Others' },
    ];

    for (const category of categories) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: category.name },
      });

      if (!existingCategory) {
        await this.categoryRepository.save(category);
      }
    }

    console.log('Categories seeded successfully!');
  }
}
