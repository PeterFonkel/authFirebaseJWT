import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/seguridad/service/login.service';
import { Producto } from '../../models/producto';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {
  @Input() producto: Producto;
  @Output() modificarProductoEvent = new EventEmitter<Producto>();
  isLoggedAdmin;
  isLoggedUser;
  
  constructor(private loginService: LoginService, private productosService: ProductosService) { }

  ngOnInit() {
     //obtengo si esta autenticado y si es admin y me suscribo para configurar lo que se muestra
     this.loginService.getIsLoggedFlagObs().subscribe((flag) => {
      this.isLoggedUser = flag;
    });
     this.loginService.getIsAdminFlagObs().subscribe((flag) => {
      this.isLoggedAdmin = flag;
    });
    console.log(this.producto)
  }
  eliminarProducto(): void {
    this.productosService.deleteProducto(this.producto.id).subscribe();
  }
  abrirModalModificacion(): void {
    this.modificarProductoEvent.emit(this.producto);
  }
}
