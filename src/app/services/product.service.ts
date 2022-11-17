import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../model/product.model";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class ProductService{

    constructor(private http: HttpClient) {

    }

    getProducts(): Observable<Array<Product>> {
        return this.http.get<Array<Product>>(
            "https://localhost:44342/api/Product",
            { headers: { "Authorization": localStorage.getItem("jwt")??"" }}
        )
    }

    getProduct(id: number): Product{
        var product: Product=new Product();
        this.http.get("https://localhost:44342/api/Product" + id).subscribe(x => {
            product = x;
        })
        return product;
    }

    updateProduct(product: Product) {
        this.http.post("https://localhost:44342/api/Product", product).subscribe(x => {});
    }

    createProduct(product: Product) {
        this.http.put("https://localhost:44342/api/Product", product).subscribe(x => {});
    }

    deleteProduct(id: number) {
        this.http.delete("https://localhost:44342/api/Product/" + id).subscribe(x => {});
    }
}

