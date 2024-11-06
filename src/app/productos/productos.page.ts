import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../servicio/producto/producto.service';
import { Producto } from '../interfaces/Producto';
import { ViewWillEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements ViewWillEnter,ViewDidLeave {

  public productos : Producto[] = [];
  private subProducto!:Subscription;

  public noHayMasProductos = false;  // Bandera para saber si no hay más productos


  constructor(
    private prdS:ProductoService
  ) { }

  



 

  public cargarMasProductos(event: Event): void {
    if (this.noHayMasProductos) {
      // Si no hay más productos, detener el spinner
      (event.target as any).complete(); 
      return;
    }

    // Llamar a la función para cargar los siguientes productos
    this.prdS.siguientesProductos();
    
    // Detener el spinner después de un pequeño retraso
    (event.target as any).complete();
  }

  
  public ionViewWillEnter(): void {
    this.subProducto = this.prdS.producto.subscribe(productos=>{
      this.productos = productos
    })
    this.prdS.listarProductos();
  }


  public ionViewDidLeave(): void {
    if(this.subProducto){
      this.subProducto.unsubscribe()

    }
  }

  public siguiente(){
    this.prdS.siguientesProductos();
  }

}
