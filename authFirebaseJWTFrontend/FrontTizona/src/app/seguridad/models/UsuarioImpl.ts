import { Rol } from "./Rol";
import { RolImpl } from "./RolImpl";
import { Usuario } from "./Usuario";

export class UsuarioImpl implements Usuario {
  id: string;
  email: string;
  roles: Rol[]= [];
  
  
  constructor(){
    let rol = new RolImpl();
    rol.rolNombre = 'sin_rol'
    this.roles.push(rol);
  }
}
