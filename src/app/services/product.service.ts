import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../model/product.model";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ProductService{

    constructor(private http: HttpClient) {

    }

    getProducts(): Observable<Array<Product>> {
        return this.http.get<Array<Product>>(`${environment.apiUrl}api/Product`);
    }

    getProduct(id: number): Product{
        var product: Product=new Product();
        this.http.get(`${environment.apiUrl}api/Product` + id).subscribe(x => {
            product = x;
        })
        return product;
    }

    updateProduct(product: Product) {
        this.http.post(`${environment.apiUrl}api/Product`, product).subscribe(x => {});
    }

    createProduct(product: Product) {
        return this.http.put(`${environment.apiUrl}api/Product`, product);
    }

    deleteProduct(id: number) {
        return this.http.delete(`${environment.apiUrl}api/Product/` + id);
    }

    uploadImage(img: Blob){
        let formData: FormData = new FormData();
        console.log(img);
        formData.append("x",<File> img, "abc.json");
        return this.http.put<{fileName: string}>(`${environment.apiUrl}api/Product/img`, formData);
    }

    isImgExist(name: string): Observable<boolean>{
        return this.http.get<boolean>(`${environment.apiUrl}api/Product/imgexist/` + name);
    }
}

