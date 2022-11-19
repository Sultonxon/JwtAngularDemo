import { ThisReceiver } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Product } from "../model/product.model";
import { isAdmin } from "../services/isAdmin.function";
import { ProductService } from "../services/product.service";


@Component({
    selector: 'app-products',
    templateUrl: 'product.component.html',
    styleUrls: ['product.component.css']
})
export class ProductComponent implements OnInit{

    constructor(private service: ProductService, private jwtHelper: JwtHelperService){ 
        service.getProducts().subscribe(x => {
             this.data = x;
             x.forEach(y => this.existImages[y.img!] = false);
        });
      }

    public data: Product[] =[];

    public newProduct: Product = new Product();

    public name:FormControl  = new FormControl();
    public price: FormControl = new FormControl();
    public discount: FormControl = new FormControl();
    public img: FormControl = new FormControl();

    public imgFile?: HTMLInputElement;
    get getProducts(){
        return this.data;
    }

    get getIsAdmin(){
        return isAdmin(this.jwtHelper);
    }

    discountPrice(product: Product): number {
        return (product.price || 0) * (100 - (product.discount || 0)) / 100;
    }

    getProduct(id: number){
        
    }

    remove(id?: number) {
        this.service.deleteProduct(id||0).subscribe(x => 
            {
                this.service.getProducts().subscribe(x => { this.data = x });
            });
    }

    saveProduct(imgs: HTMLInputElement){
        let url: string = "";
        if(imgs && imgs.files && imgs.files.length > 0){
            this.service.uploadImage(imgs.files![0]).subscribe(x =>{
                 url = x.fileName;

                 this.newProduct.img = url??"";
                 
                 console.log(this.newProduct);
                 
                    this.service.createProduct(this.newProduct).subscribe(x => 
                        {
                            console.log(this.newProduct);
                            this.newProduct = new Product();
                            this.service.getProducts().subscribe(x => { this.data = x });
                            console.log(this.img);
                        });
            });
        }        
    }

    existImages: {[key: string]: boolean} = {};

    isImgExist(uri: string){
            this.service.isImgExist(uri).subscribe(x => {
                this.existImages[uri] = x;
            });
    }

    ngOnInit(): void {
        let x = this.service.getProducts();
    }
}