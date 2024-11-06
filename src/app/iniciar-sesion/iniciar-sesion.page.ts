import { Component } from '@angular/core';
import { ViewWillEnter,ViewDidLeave } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicio/auth/auth.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements ViewWillEnter,ViewDidLeave {

  public formulario : FormGroup
  public cargando_bloqueo: boolean = false;
  private subCargando! : Subscription;
  isMoved: boolean = false;  // Estado del círculo (si está movido o no)



  constructor(
    private fb:FormBuilder,
    private auth:AuthService
  ) { 
    this.formulario = fb.group({
      usuario:['',[Validators.required]],
      contrasenia:['',[Validators.required]]

    })
  }

  

  public validarFormulario(){
    const esValido = this.formulario.valid;
    if(!esValido){

      return
    }
    const datos = this.formulario.getRawValue()
    const usuario = datos['usuario']
    const contrasenia = datos['contrasenia']
    this.auth.iniciar_sesion(usuario,contrasenia)
  }


  public ionViewWillEnter(): void {
    this.subCargando = this.auth.cargando.subscribe(nuevoValor =>{
      this.cargando_bloqueo = nuevoValor;
  })

  }

  public ionViewDidLeave(): void {
    if(this,this.subCargando){
      this.subCargando.unsubscribe();
    }
  }

  toggleRecuerdame() {
    this.isMoved = !this.isMoved;
  }
}
