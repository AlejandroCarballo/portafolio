import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Producto} from '../interfaces/producto.interface'
import { ProductoDescripcion } from '../interfaces/producto-descripcion-interface';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private  Http: HttpClient) {
    this.cargarProductos();
   }


  private cargarProductos(){

    return new Promise((resolve, reject)=>{
      this.Http.get('https://angular-html-86b17.firebaseio.com/productos_idx.json')
    .subscribe((resp: Producto[]) =>{

      this.productos = resp;
      this.cargando = false;
      resolve();

    });

    
      
      
    });

  
}

getProducto(id:string){
  return this.Http.get(`https://angular-html-86b17.firebaseio.com/productos/${ id }.json`)

}

buscarProducto(termino: string){
  if(this.productos.length===0){
    //cargar productos
    this.cargarProductos().then(()=>{
      //ejectar despues de tener los productos
      //Aplicar filtro
      this.filtrarProductos(termino);
    });

  } else {
    this.filtrarProductos(termino);

  }
  this.productosFiltrado = this.productos.filter(producto =>{
    return true;
  });

  console.log(this.productosFiltrado);
}

private filtrarProductos(termino: string){

  console.log(this.productos);
  this.productosFiltrado = [];

  termino = termino.toLocaleLowerCase(); 
  this.productos.forEach(prod =>{

const tituloLower = prod.titulo.toLocaleLowerCase();


    if(prod.categoria.indexOf(termino)>=0 || prod.titulo.indexOf(termino)>=0){

      this.productosFiltrado.push(prod);
    }
  })

}

}

