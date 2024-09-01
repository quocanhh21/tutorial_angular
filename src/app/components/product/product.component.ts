import { Component, EventEmitter, Input, input, Output, ViewChild } from '@angular/core';
import { Product } from '../../type';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { PricePipe } from '../../pipes/price.pipe';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule, 
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
    PricePipe,
    TruncateNamePipe
  ],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {

  constructor(private confirmationService: ConfirmationService) { }

  @ViewChild('deleteButton') deleteButton: any;

  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  ngOnInit() {
  }

  editProduct(){
    this.edit.emit(this.product);
  }

  confirmDeleteProduct(){
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.deleteProduct();
      }
    });
  }

  deleteProduct(){
    console.log(this.product,'delete product');
    this.delete.emit(this.product);
  }
}
