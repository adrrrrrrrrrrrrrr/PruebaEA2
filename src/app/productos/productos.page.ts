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
  public noHayMasProductos = false; 

  constructor(
    private prdS:ProductoService
  ) { }

  



 

  public cargarMasProductos(event: Event): void {
    if (this.noHayMasProductos) {
      (event.target as any).complete(); 
      return;
    }
    this.prdS.siguientesProductos();
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



}
