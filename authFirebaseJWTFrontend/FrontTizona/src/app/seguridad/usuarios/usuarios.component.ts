import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tiposEnvironment } from 'src/environments/tiposEnvironment';
import { Usuario } from '../models/Usuario';
import { UsuarioImpl } from '../models/UsuarioImpl';
import { LoginService } from '../service/login.service';
import { UsuariosService } from '../service/usuarios.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = new UsuarioImpl();
  roles: string[][] = tiposEnvironment.tipoUsuario;

  constructor(
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsuarios();
    //Boton de registrarse
    const registrarseForm = document.querySelector("#registrarse");
    registrarseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = (document.querySelector('#email-registro') as HTMLInputElement).value;
      const password = (document.querySelector('#password-registro') as HTMLInputElement).value;
      const password2 = (document.querySelector('#password-registro2') as HTMLInputElement).value;
      const rol = (document.querySelector('#rol-registro') as HTMLInputElement).value;

      if (password == password2) {
        this.loginService.signin(email, password, rol);
        this.getUsuarios();
      } else {
        Swal.fire({
          title: "Error",
          text: "Los password no coinciden",
          icon: "error",
        });
      }
    })
  }

  getUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe(response => {
      console.log("Respuesta del service", response)
      this.usuarios = this.usuariosService.mapearUsuarios(response)
      console.log(this.usuarios)

    })
  }

}
