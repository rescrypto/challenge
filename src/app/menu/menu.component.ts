import {Component, OnInit} from '@angular/core';
import {MenuService} from './services/menu.service';
import {Product} from './product/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  products: Product[];

  constructor(private catalogService: MenuService) {
    this.products = [];
    this.fetchProducts();
  }

  ngOnInit() {
  }

  private fetchProducts() {
    this.catalogService.getProducts().subscribe(data => {
      this.products = data.products;
    });
  }
}
