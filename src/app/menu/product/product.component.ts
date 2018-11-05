import {Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MenuService} from '../services/menu.service';
import {ActivatedRoute} from '@angular/router';
import {ProductDetail} from './productDetail';
import {MatSelectionList} from '@angular/material';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: ProductDetail;
  private id: number;
  selectedOptions: { price: number, id: number }[];
  count: number;
  price: number;
  @ViewChild('selectReset') selectReset: MatSelectionList;
  isInit: boolean;

  constructor(private renderer: Renderer2,
              private productsService: MenuService,
              private route: ActivatedRoute,
              private location: Location) {
    this.product = null;
    this.selectedOptions = [];
    this.count = 1;
    this.price = 0;
    this.isInit = false;
  }

  ngOnInit() {
    this.getRouteParams();
    this.renderer.addClass(document.body, 'modal-open');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'modal-open');
  }

  goBack() {
    this.location.back();
  }

  handleSelection(event) {
    if (event.option.selected) {
      this.selectedOptions.push(event.option.value);
    } else {
      const index = this.selectedOptions.indexOf(event.option.value);
      if (index >= 0) {
        this.selectedOptions.splice(index, 1);
      }
    }
    this.calculatePrice();
  }

  handleSelectionSingle(event) {
    if (event.option.selected) {
      event.source.selectedOptions.selected.map((item) => {
        const index = this.selectedOptions.indexOf(item.value);
        if (index >= 0) {
          this.selectedOptions.splice(index, 1);
        }
        item._setSelected(false);

      });
      event.option._setSelected(true);
      this.selectedOptions.push(event.option.value);
    } else {
      const index = this.selectedOptions.indexOf(event.option.value);
      if (index >= 0) {
        this.selectedOptions.splice(index, 1);
      }
    }
    this.calculatePrice();
  }

  handleSelectionRequired(event) {
    if (event.option.selected) {
      event.source.selectedOptions.selected.map((item) => {
        const index = this.selectedOptions.indexOf(item.value);
        if (index >= 0) {
          this.selectedOptions.splice(index, 1);
        }
        item._setSelected(false);

      });
      event.option._setSelected(true);
      this.selectedOptions.push(event.option.value);
      this.calculatePrice();
    } else {
      event.option._setSelected(true);
    }
  }

  handleReset(extra) {
    extra.items.map((item) => {
      const index = this.selectedOptions.indexOf(item);
      if (index >= 0) {
        this.selectedOptions.splice(index, 1);
      }
    });
    this.selectReset.deselectAll();
    this.calculatePrice();
  }

  handleIncrease() {
    this.count += 1;
    this.calculatePrice();
  }

  handleDecrease() {
    if (this.count > 1) {
      this.count -= 1;
      this.calculatePrice();
    }
  }

  addToCart() {
    console.log('result', this.id, this.count, this.selectedOptions);

    this.location.back();
  }

  private calculatePrice() {
    this.price = this.product.price;
    this.selectedOptions.map((item) => {
      this.price += item.price;
    });
    this.price *= this.count;
  }

  private setDefaultOptions() {
    if (this.product.price) {
      this.price = this.product.price;
    }
    if (this.product.extras) {
      this.product.extras.map((extra) => {
        if (extra.min >= 1) {
          const count = extra.min;
          for (let i = 0; i < count; i += 1) {
            this.selectedOptions.push(extra.items[i]);
          }
        }
      });
    }
  }


  private getRouteParams() {
    this.route.params.subscribe(params => {
      if (params['id'] && isFinite(params['id']) && Number.isInteger(+params['id'])) {
        this.id = +params['id'];
        this.fetchProduct(this.id);
        this.isInit = true;

      } else {
        this.ngOnDestroy();
        this.location.go('/menu');
      }
    });
  }

  private fetchProduct(id: number, index?: number) {
    this.productsService.getProduct(id, index).subscribe(
      product => {
        this.product = product;
        this.setDefaultOptions();
      }
    );
  }
}
