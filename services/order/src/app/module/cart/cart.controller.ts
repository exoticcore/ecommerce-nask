import { Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  async addToCart() {
    return { message: `add to cart controller` };
  }
}
