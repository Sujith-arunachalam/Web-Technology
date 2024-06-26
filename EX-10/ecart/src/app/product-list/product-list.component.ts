import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = [
    { id: 1, name: 'OLA S1 PRO', price: 100000, description: 'Pure Power.Peak PerformanceNow with a 8-years Battery Warranty', imageUrl: './assets/image/ola_s1_pro.jpg' },
    { id: 2, name: 'OLA S1 AIR', price: 125000, description: 'Feature packed.Future packed. Now with a 8-years Battery Warranty', imageUrl: './assets/image/ola_s1_air.jpg' },
    { id: 3, name: 'OLA S1X+', price: 150000, description: 'Upgrade to electric with style. Now with a 8-years Battery Warranty', imageUrl: './assets/image/ola_s1_x.jpg' },
    { id: 4, name: 'OLA S1X', price: 130000, description: 'Now with a 8-years Battery Warranty', imageUrl: './assets/image/s1x.jpg.jpg' },
    { id: 5, name: 'OLA S1', price: 80000, description: 'Feature packed.Future packed. Now with a 8-years Battery Warranty', imageUrl: './assets/image/s1.jpg.jpg' }
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}