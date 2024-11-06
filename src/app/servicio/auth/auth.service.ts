import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CuerpoLogin } from 'src/app/interfaces/CuerpoLogin';
import { UsuarioLogeado } from 'src/app/interfaces/UsuarioLogeado';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL_LOGIN:string = 'https://dummyjson.com/auth/login'
  public usuarioLogueado: UsuarioLogeado | null = null;
  public accessToken:string | null = null;
  private $cargando = new BehaviorSubject<boolean>(false);
  public cargando = this.$cargando.asObservable();

  constructor(
    private http:HttpClient, 
    private router:Router
  ) { }

  public iniciar_sesion(nomb_usuario:string, clave:string){
    this.$cargando.next(true);
    const cuerpo:CuerpoLogin = {
      username : nomb_usuario,
      password : clave
    }
    this.http.post<UsuarioLogeado>(this.URL_LOGIN,JSON.stringify(cuerpo),{
      headers :{
        'Content-Type' : 'Application/json'
      }
    }).pipe(
      catchError(error => {
        this.$cargando.next(false);
        return of(null);  

      })
    )
    
    .subscribe(resultado =>{
      if(resultado){
      this.usuarioLogueado=resultado;
      this.accessToken = resultado.accessToken;
      this.$cargando.next(false);
      console.log(resultado);
      this.router.navigate(['/','productos']);
      
    } else{
      this.$cargando.next(false);
      console.error('Error: respuesta no válida o sin accessToken.');
      alert('No se pudo iniciar sesión. Por favor, verifica tus datos.');

      }

    })
  }

  public cerrar_sesion(){
    if(this.usuarioLogueado){
      this.usuarioLogueado=null;
      this.accessToken=null;
    }

  }
}
