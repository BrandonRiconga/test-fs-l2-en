import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, ILike } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { CategoryId, sku, ...productData } = createProductDto;

    //check sku
    const existingProduct = await this.productsRepository.findOne({ where: { sku } });
    if(existingProduct){
      throw new ConflictException(`Product with SKU ${sku} already exists`);
    }

    const category = await this.categoriesRepository.findOne({ where: { id: CategoryId } });
    if(!category) {
      throw new NotFoundException(`Category with ID ${CategoryId} not found`);
    }

    const newProduct = this.productsRepository.create({
      ...productData,
      category
    })

    return this.productsRepository.save(newProduct);
  }

  async findAll(page: number = 1, limit: number = 10, search: string = ''): Promise<{data: Product[], meta: any}> {
    const skip = (page - 1) * limit;

    const [products, totalCount] = await this.productsRepository.findAndCount({
      where: [
        {name: ILike(`%${search}%`)},
        {sku: ILike(`%${search}%`)},
        {description: ILike(`%${search}%`)},
      ],
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    })

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: products,
      meta: {
        totalCount,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    }
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });

    if(!product){
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    //check sku
    if(updateProductDto.sku) {
      const existingProduct = await this.productsRepository.findOne({ where: { sku: updateProductDto.sku, id: Not(id) } });
      if(existingProduct) {
        throw new ConflictException(`Product with SKU ${updateProductDto.sku} already exists`);
      }
    }

    if(updateProductDto.CategoryId) {
      const category = await this.categoriesRepository.findOne({ where: { id: updateProductDto.CategoryId } });

      if(!category) {
        throw new NotFoundException(`Category with ID ${updateProductDto.CategoryId} not found`);
      }
      product.category = category;
    }

    Object.assign(product, updateProductDto);

    await this.productsRepository.save(product);
    return product;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id)
    await this.productsRepository.remove(product);
  }
}
