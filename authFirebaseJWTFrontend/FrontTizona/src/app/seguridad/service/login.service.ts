import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

import { firebaseConfig } from "src/environments/firebaseConfig";
import { UsuarioImpl } from "../models/UsuarioImpl";
import { TokenDto } from "../models/token-dto";
import { TokenService } from "./token.service";
import { Usuario } from "../models/Usuario";
import { RolImpl } from "../models/RolImpl";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

const cabecera = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
const USER_KEY = "EMAIL";
const ROLE_KEY = "ROL";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  token: TokenDto;
  usuario: Usuario = new UsuarioImpl();
  endPoint = environment.urlBack;

  isLoggedFlag$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  isAdminFlag$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getIsLoggedFlagObs(): Observable<boolean> {
    if (this.tokenService.getToken()) {
      this.setIsLoggedFlagObs(true);
    }
    return this.isLoggedFlag$.asObservable();
  }

  setIsLoggedFlagObs(isLoged: boolean) {
    this.isLoggedFlag$.next(isLoged);
  }

  getIsAdminFlagObs(): Observable<boolean> {
    if (this.getRol() == "ROLE_ADMIN") {
      this.setIAdminFlagObs(true);
    }
    return this.isAdminFlag$.asObservable();
  }

  setIAdminFlagObs(isAdmin: boolean) {
    this.isAdminFlag$.next(isAdmin);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  iniciarFirebase() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig.firebaseConfig);
    }
  }

  signin(email, password, rol): Observable<string> {
    console.log("Guardando usuario");
    let usuario = new UsuarioImpl();
    console.log("registrando");
    var auth = firebase.auth();
    //Creación de un usuario nuevo en Firebase
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        if (userCredentials) {
          console.log(userCredentials);
          usuario.email = email;
          //Obtengo el rol de la BBDD
          usuario.roles[0] = new RolImpl();
          usuario.roles[0].rolNombre = rol;
          console.log(usuario);
          this.http
            .post(this.endPoint + "/usuarios/nuevousuario", usuario, cabecera)
            .subscribe((response) => {
              if (response) {
                console.log("ok: ", response);
                Swal.fire({
                  title: "Usuario creado",
                  icon: "success",
                });

              } else {
                catchError((e) => {
                  Swal.fire({
                    title: "Error",
                    text: "¡Vaya! No se ha podido Crear el usuario. Si el problema persiste contacte al administrador",
                    icon: "error",
                  });
                  console.log("error", e);
                  if (e.status === 400) {
                    return throwError(e);
                  }
                  if (e.error.mensaje) {
                    console.error(e.error.mensaje);
                  }
                  return throwError(e);
                });
              }
            });
        }
      })
      .catch((reason) => {
        Swal.fire({
          title: "Error",
          text: reason.message,
          icon: "error",
        });
        console.log("error:", reason);
      });
    return email;
  }

  eliminarUsuario(id: string): void {
    console.log("eliminando usuario");
    this.http
      .delete(this.endPoint + "/api/usuarios/" + id, cabecera)
      .subscribe((response) => {
        if (response) {
          console.log("ok: ", response);
          Swal.fire({
            title: "Usuario Eliminado",
            icon: "success",
          });
        } else {
          catchError((e) => {
            Swal.fire({
              title: "Error",
              text: "¡Vaya! No se ha podido eliminar el usuario. Si el problema persiste contacte al administrador",
              icon: "error",
            });
            console.log("error", e);
            if (e.status === 400) {
              return throwError(e);
            }
            if (e.error.mensaje) {
              console.error(e.error.mensaje);
            }
            return throwError(e);
          });
        }
      });
  }

  //Login con usuario y contraseña
  login(email, password): Observable<UsuarioImpl> {
    this.iniciarFirebase();
    var auth = firebase.auth();
    //Autenticacion con Firebase
    auth.signInWithEmailAndPassword(email, password).then(userCredentials => {
      console.log("Credendciales de usuario", userCredentials);
      if (userCredentials) {
        this.usuario.email = userCredentials.user.email;
        userCredentials.user.getIdToken().then((idToken) => {
          this.token = new TokenDto(idToken);
          this.tokenService.setToken(idToken);
          this.setIsLoggedFlagObs(true);
          //Una vez autenticado con Firebase y recibido un token, se envia para la autenticacion en el Back.
          this.http.post<TokenDto>(this.endPoint + "/oauth/google", this.token, cabecera).subscribe(response => {
            this.token = response;
            this.tokenService.setToken(response.value);
            this.http.get<any>(this.endPoint + "/api/usuarios/search/findByEmail?email=" + userCredentials.user.email, cabecera).subscribe(response => {
              console.log(response);
              this.mapearUsuario(response).subscribe(usuarioMapeado => {
                this.usuario = usuarioMapeado;
                console.log("Usuario mapeado: ", usuarioMapeado)
                if(this.usuario.roles[0].rolNombre == "ROLE_ADMIN"){
                  this.setIAdminFlagObs(true);
                }
              });

              if (response) {
                console.log("ok: ", response);
                Swal.fire({
                  title: "Bienvenido",
                  icon: "success",
                });
              }
            });
          });
        });
      }

    })
      .catch((reason) => {
        Swal.fire({
          title: "Error",
          text: "Usuario o contraseña erroneas",
          icon: "error",
        });
        console.log("error:", reason);
      });
    return of(this.usuario);
  }

  //Salir del login
  exitLogin(): void {
    var auth = firebase.auth();
    auth.signOut().then((userCredentials) => {
      console.log("saliendo", userCredentials);
      this.usuario = new UsuarioImpl();
      this.tokenService.logOut();
      sessionStorage.clear();
      this.setIAdminFlagObs(false);
      this.setIsLoggedFlagObs(false);
    });
  }

  //Convertir un Usuario recibido por una llamada HTTP en un Usuario del Front
  mapearUsuario(usuarioSinMapear: any): Observable<UsuarioImpl> {
    this.usuario = new UsuarioImpl();
    this.usuario.email = usuarioSinMapear.email;
    //Obtenemos el rol del usuario
    this.http
      .get<any>(usuarioSinMapear._links.roles.href, cabecera)
      .subscribe((response) => {
        console.log(response);
        //Lo mapeamos para crear un objeto tipo Rol
        this.mapearRol(response).subscribe(rolMapeado => {
          this.usuario.roles = rolMapeado;
        });
        console.log(this.usuario);
        sessionStorage.setItem(USER_KEY, this.usuario.email);
        sessionStorage.setItem(ROLE_KEY, this.usuario.roles[0].rolNombre);

        if (this.usuario.roles[0].rolNombre == "ROLE_ADMIN") {
          this.setIAdminFlagObs(true);
        }
      });
    return of(this.usuario);
  }

  //Convertir un Rol recibido de una llamada HTTP en un Rol del Front
  mapearRol(rolesSinMapear: any): Observable<RolImpl[]> {
    let roles = [];
    roles = rolesSinMapear._embedded.roles;
    console.log("Roles mapeado: ", roles)
    return of(roles);
  }

  getRol(): string {
    return sessionStorage.getItem(ROLE_KEY);
  }

  enviarSolicitudConToken(tokenDto: TokenDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(
      this.endPoint + "/oauth/google",
      tokenDto,
      cabecera
    );
  }

  getUserLogged(): string {
    return sessionStorage.getItem(USER_KEY);
  }
}
