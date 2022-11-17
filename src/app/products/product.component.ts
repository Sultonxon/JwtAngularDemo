import { Component, OnInit } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductService } from "../services/product.service";


@Component({
    selector: 'app-products',
    templateUrl: 'product.component.html',
    styleUrls: ['product.component.css']
})
export class ProductComponent implements OnInit{

    constructor(private service: ProductService){ 
        service.getProducts().subscribe(x => { this.data = x });
      }

    public data: Product[] =[];

    public newProduct: Product = new Product();

    get getProducts(){
        return this.data;
    }

    discountPrice(product: Product): number {
        return (product.price || 0) * (100 - (product.discount || 0)) / 100;
    }

    getProduct(id: number){
        
    }

    remove(id?: number) {
        this.service.deleteProduct(id||0);
    }

    saveProduct(){
        console.log(this.newProduct);
        this.service.createProduct(this.newProduct);
        this.newProduct = new Product();
    }


    ngOnInit(): void {
        let x = this.service.getProducts();
    }
}