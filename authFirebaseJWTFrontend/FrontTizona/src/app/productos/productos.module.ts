import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './productos/producto/producto.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductosComponent, ProductoComponent, ProductosFormComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule
  ],
  exports: [
    ProductosComponent
  ]
})
export class ProductosModule { }
