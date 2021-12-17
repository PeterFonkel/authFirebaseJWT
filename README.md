# authFirebaseJWT

## Descripción general

API REST.
Seguridad API: Spring Security
Login con usuario y contraseña: Firebase (Google Cloud).

El registro de usuarios lo hace el administrador.

ADMIN: CRUD Productos.

USER: READ Productos.

## Instalación de Firebase

En el Front:

`npm install firebase --save`

Cambiamos la versión de Firebase en package.json: 

`"dependencies": {`
   
    `"firebase": "^8.10.0",`
    
  `},`
  
  En la carpeta enviroments creamos el archivo firebase.ts con la configuración de nuestro proyecto Firebase. Esta información se encuentra en el icono ⚙️ al lado de "Descripción general del proyecto" > "configuración del proyecto".
  
  `export const firebaseConfig = {`
  
    apiKey: "XXXXXXXXXXXXXXXXXXXX",
    authDomain: "xxxxxxxxxxxxx.firebaseapp.com",
    projectId: "xxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    measurementId: "xxxxxxxxxxxxxxxx"
    
  `};`

Estas claves son privadas. Añadir a gitignore antes de subir a github.

En la API:
```
dependencies {
  ...
  implementation 'com.google.firebase:firebase-admin:8.1.0'
  implementation 'com.google.api-client:google-api-client:1.30.9' 
  ...
  }
``` 

## Jason Web Token (JWT).

En la API:

En build.gradle:

```
dependencies {
  ...
  implementation 'org.springframework.boot:spring-boot-starter-security:2.5.5'	
  implementation 'io.jsonwebtoken:jjwt:0.9.1'
  
  testImplementation 'org.springframework.security:spring-security-test'
  ...
  }
``` 







