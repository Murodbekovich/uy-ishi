import { ProductModule } from './product.module';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productModel: typeof Product) { }

  async create(createProductDto: CreateProductDto): Promise<{ message: string }> {
    const { title, description, price } = createProductDto
    await this.productModel.create({ title, description, price })
    return { message: "Added new product" }
  }

  async findAll(): Promise<Product[]> {
    const product = await this.productModel.findAll()
    return product
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productModel.findByPk(+id)

    if (!product) throw new NotFoundException("Product not found")
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<{ message: string }> {
    const product = await this.findOne(+id)

    product.update(updateProductDto)
    return { message: "Updated product" }
  }

  async remove(id: number): Promise<{ message: string }> {
    const product = await this.productModel.findOne({ where: { id } })

    if (!product) throw new NotFoundException("Product not found")

    await this.productModel.destroy({ where: { id } })
    return { message: "Deleted product" }
  }
}
