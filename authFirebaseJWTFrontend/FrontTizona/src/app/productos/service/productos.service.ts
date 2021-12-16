import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

const cabecera = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  endpoint: string = environment.urlAPI;
  productosMapeado: Producto[] = [];
  
  constructor(private http: HttpClient) { }

  getProductos(): Observable<any[]>{
    return this.http.get<any[]>(this.endpoint + "/productos", cabecera)
  }

  mapearProductos(responseApi: any): Observable<Producto[]> {
    console.log(responseApi)
    let productos: Producto[] = [];
    productos = responseApi._embedded.productos;
    productos.forEach(element => {
      element.id = this.getIdProducto(element)
    });
    return of(productos);
  }

  getIdProducto(p: any): string {
    let url = p._links.self.href;
    let trozos = url.split("/");
    // console.log(`trozos: ${ trozos }`);
    return trozos[trozos.length - 1];
  }

  postProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.endpoint + "/productos",producto , cabecera);
  }
  deleteProducto(id: string): Observable<any> {
    console.log(id);
    return this.http.delete(this.endpoint + "/productos/" + id, cabecera);
  }
  patchProducto(producto: Producto): Observable<any> {
    return this.http.patch(this.endpoint + "/productos/" + producto.id, producto, cabecera)
  }
}
