import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion-interface';

import{ ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion;
  id: string;

  constructor(private route: ActivatedRoute, public productoService: ProductosService ) { }

  ngOnInit() {
    this.route.params.
    subscribe(parametros =>{
      type NewType = ProductoDescripcion;

      //console.log(parametros['id']);

      this.productoService.getProducto(parametros ['id'])
      .subscribe( (producto: NewType) => {
        this.id = parametros['id'];
        this.producto = producto;
      });
    })
  }

}
