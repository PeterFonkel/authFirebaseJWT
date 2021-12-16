import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RolImpl } from '../models/RolImpl';
import { UsuarioImpl } from '../models/UsuarioImpl';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  rol: RolImpl = new RolImpl();
  usuarioLoggeado: UsuarioImpl = new UsuarioImpl();
  emailRegistrado: string;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    console.log("Inicio usuario: ", this.usuarioLoggeado)
  }


  signin(): void {
    this.loginService.signin(this.email, this.password, this.rol).subscribe(email=>{
      console.log(email)
      this.emailRegistrado = email;
    })
  }

  login(): void {
    this.loginService.login(this.email, this.password).subscribe(usuario=>{
      setTimeout(()=>{
        this.usuarioLoggeado.roles[0].rolNombre = sessionStorage.getItem('ROL');
        this.usuarioLoggeado.email = sessionStorage.getItem('EMAIL')
      },1500)
    })
  }

  exitLogin(): void {
    this.loginService.exitLogin();
    this.usuarioLoggeado = undefined;
    sessionStorage.clear();
    document.location.reload();
  }
}
