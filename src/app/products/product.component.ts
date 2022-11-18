import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
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

    public name:FormControl  = new FormControl();
    public price: FormControl = new FormControl();
    public discount: FormControl = new FormControl();

    get getProducts(){
        return this.data;
    }

    discountPrice(product: Product): number {
        return (product.price || 0) * (100 - (product.discount || 0)) / 100;
    }

    getProduct(id: number){
        
    }

    remove(id?: number) {
        this.service.deleteProduct(id||0).subscribe(x => 
            {
                console.log("deleted");
                this.service.getProducts().subscribe(x => { this.data = x });
            });
    }

    saveProduct(){
        console.log(this.newProduct);
        this.service.createProduct(this.newProduct).subscribe(x => 
            {
                console.log("product created");
                this.newProduct = new Product();
                this.service.getProducts().subscribe(x => { this.data = x });
            })
        
    }


    ngOnInit(): void {
        let x = this.service.getProducts();
    }
}