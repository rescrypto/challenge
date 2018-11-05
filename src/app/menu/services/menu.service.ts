import {Injectable} from '@angular/core';
import {environment as env} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '../product/product';
import {ProductDetail} from '../product/productDetail';

const API_URL = env.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly products: Product[];
  private readonly productsDetail: {};


  constructor(private http: HttpClient) {
    this.products = [];
    this.productsDetail = {};
  }

  public getProducts(): Observable<{ products: Product[] }> {
    return Observable.create(observer => {
      observer.next(this.products);
      this.http.get(`${API_URL}/products`).subscribe(data => {
          observer.next(data);
        }, error => {
          console.error(error);
        }
      );
    });
  }

  public getProduct(id: number, index?: number): Observable<ProductDetail> {
    return Observable.create(observer => {
      if (this.productsDetail[id]) {
        observer.next(this.productsDetail[id]);
      } else if (index !== undefined) {
        observer.next(this.products[index]);
      }
      this.http.get(`${API_URL}/product/${id}`).subscribe(data => {
          this.productsDetail[id] = data;
          observer.next(data);
        }, error => {
          console.error(error);
        }
      );
    });
  }
}
