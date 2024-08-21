import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductComponent } from "../components/product/product.component";
import { Product, Products } from '../type';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent,CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private productsService: ProductsService
  ) { }

  products: Product[] =[];

  totalRecords: number = 0;
  rows: number = 5; 

  ngOnInit() {
    this.fetchProducts(0,this.rows);
  }

  onPageChange(event: any){
    console.log(event, 'Event');  
    this.fetchProducts(event.page, event.rows);
  }

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  fetchProducts(pageRequest:number, perPageRequest: number) {
    this.productsService.getProducts('http://localhost:3000/clothes', { page: pageRequest, perPage: perPageRequest })
    .subscribe((products: Products) => {
      this.products = products.items;
      this.totalRecords = products.total;
    });
  }
}
