import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CuerpoLogin } from 'src/app/interfaces/CuerpoLogin';
import { UsuarioLogeado } from 'src/app/interfaces/UsuarioLogeado';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL_LOGIN:string = 'https://dummyjson.com/auth/login'
  public usuarioLogueado: UsuarioLogeado | null = null;
  public accessToken:string | null = null;


  constructor(
    private http:HttpClient
  ) { }

  public iniciar_sesion(nomb_usuario:string, clave:string){
    const cuerpo:CuerpoLogin = {
      username : nomb_usuario,
      password : clave
    }
    this.http.post<UsuarioLogeado>(this.URL_LOGIN,JSON.stringify(cuerpo),{
      headers :{
        'Content-Type' : 'Application/json'
      }
    })
    .subscribe(resultado =>{
      this.usuarioLogueado=resultado;
      this.accessToken = resultado.accessToken;
      console.log(resultado);
    });
  }
}
