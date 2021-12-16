import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductosService } from '../service/productos.service';
declare var $: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  producto: Producto = new Producto();

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos(): void {
    this.productosService.getProductos().subscribe(response => {
      this.productosService.mapearProductos(response).subscribe(response => {
        this.productos = response
      })
    }), err => {
      console.log(err)
    };
  }
  abrirModalModificacion(producto: Producto): void {
    this.producto = producto;
    $("#modificarModal").modal('show');
  }
  modificarProducto(): void {
    this.productosService.patchProducto(this.producto).subscribe(response => {
      this.producto = new Producto();
      this.ngOnInit();
    });
  }
  

}
