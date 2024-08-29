import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductComponent } from '../components/product/product.component';
import { Product, Products } from '../type';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule,EditPopupComponent,ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];

  totalRecords: number = 0;
  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  selectedProduct: Product = {
    id:0,
    name: '',
    price: 0,
    image: '',
    rating: 0,
  };

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }
    this.updateProduct(product, this.selectedProduct.id ?? 0);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }

  onPageChange(event: any) {
    console.log(event, 'Event');
    this.fetchProducts(event.page, event.rows);
  }

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  fetchProducts(pageRequest: number, perPageRequest: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', {
        page: pageRequest,
        perPage: perPageRequest,
      })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (data) => {
          console.log(data);
        },
      });
  }

  addProduct(product: Product) {
    this.productsService
      .addProducts('http://localhost:3000/clothes', product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (data) => {
          console.log(data);
        },
      });
  }

  updateProduct(product: Product, id: number) {
    this.productsService
      .updateProducts(`http://localhost:3000/clothes/${id}`, product)
      .subscribe(
      {
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (data) => {
          console.log(data);
        },
      });
  }

  deleteProduct(id: number) {
    this.productsService
      .deleteProducts(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (data) => {
          console.log(data);
        },
      });
  }
}
