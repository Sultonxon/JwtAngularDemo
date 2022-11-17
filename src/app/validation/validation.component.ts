import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  constructor() { }

  newProduct: Product = new Product();

  form: FormGroup = new FormGroup('');

  name: FormControl = new FormControl();
  price: FormControl = new FormControl();
  discount: FormControl = new FormControl();

  get jsonProduct(){
    return JSON.stringify(this.newProduct);
  }

  addproduct(product: Product){
    console.log("New Product: " + this.jsonProduct);
  }

  log(obj: any){
    console.log(obj);
  }

  ngOnInit(): void {
  }

}
