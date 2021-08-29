import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../model/product-interface';
import { ProductService } from 'src/app/services/products/product.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as dayjs from 'dayjs';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() visibleProducts: boolean = false;
  @Input() visibleProductsDelete: boolean = false;
  @Input() visibleProductsAdd: boolean = false;
  products: Product[] = [];
  productId!: string;
  productImg!: string;

  @Input() title: string = '';
  @Input() buttonAddUpdate: string = '';
  @Input() objProd2: any;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor(private prod: ProductService) { }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void { }
  cerrarModalProduct() {
    this.close.emit(false);
  }
  deleteProducts() {
    this.prod.deleteProduct(this.objProd2).subscribe(() => {
      this.products = this.products.filter((prod) => prod._id != this.objProd2.id);
      this.cerrarModalProduct();
    }, error => {
      console.log(error);
      alert("Bad Request, enter valid data");
    });
  }
  addProduct() {
    if (this.form.valid) {
      const newProd: object = {
        name: this.form.value.name,
        price: this.form.value.price,
        image: this.form.value.image,
        type: this.form.value.type,
        dateEntry: dayjs().format('YYYY-MM-DD')
      }
      this.prod.postProduct(newProd).subscribe(() => {
        this.form.reset();
        this.cerrarModalProduct();
        console.log(newProd); console.log('registrado');
      }, error => {
        console.log(error);
        alert("Bad Request, enter valid data");
      });
    } else {
      alert('Verifique los campos')
    }
  }
  editProduct(nameProd: string, price: string, type: string, image: string) {
    if (nameProd == '' || price == '' || type == '' || image == '') {
      alert("Complete all inputs and enter correct data");
    } else {
      const newProd = {
        name: nameProd,
        image: image,
        price: parseInt(price),
        type: type,
      }
      this.prod.updateProduct(newProd, this.objProd2._id).subscribe(() => {
        this.cerrarModalProduct();
      }, error => {
        alert("Bad Request, enter valid data");
        console.log(error, this.objProd2);
      });
    }
  }
}
