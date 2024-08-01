import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { ApiService } from '../../services/api.service';
import { PrimengModule } from '../../../../primeng.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [PrimengModule, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [ConfirmationService, MessageService, ApiService, DialogService],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  endpoint_get : string;

  cursoNewDialog: boolean = false;
  cursoEditDialog: boolean = false;

  agregar: boolean = false;
  
  productos: any;

  ref: DynamicDialogRef | undefined;

  constructor(
    private apiServ: ApiService,
    private formBuilder: FormBuilder
  ) {
    // Init endpoints
    this.endpoint_get = 'Producto'
  }

  ngOnInit() {
    this.loadEntities();
  }

  loadEntities() {
    this.apiServ.get(this.endpoint_get).subscribe(
      res => {
        this.productos = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  favorito(e : any){
    console.log(e);
    if (!e.usuario) {
      Swal.fire('Error', 'Debes indicar tu usuario para añadir productos a favoritos', 'error');
      return;
    }
    let deseado = {
      productId: e.id,
      nombreUsuario: e.usuario
    }
    this.apiServ.post('Producto/Deseado', deseado).subscribe(
      res => {
        if(res.productId){
          Swal.fire('Añadido', 'Producto añadido a favoritos', 'success');
        }else{
          Swal.fire('Error', 'No se ha podido añadir el producto a favoritos', 'error');
        }
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  detalles(d : any){
    this.apiServ.get('Producto/' + d.id).subscribe(
      res => {
            let template = `
        <div>
          <p>Nombre: ${res.nombre}</p>
          <p>Categoría: ${res.categoria}</p>
          <p>Descripción: ${res.descripcion}</p>
          <p>Stock: ${res.stock}</p>
          <p>Veces Favorito: ${res.cantidadDeseados}</p>
        </div>
        `

        Swal.fire({
          title: 'Detalles del producto',
          html: template
        });
      },
      err => {
        console.log(err);
        Swal.fire('Error', 'No se ha podido obtener los detalles del producto', 'error');
        return;
      }
    );
  }


  openNew() {
    this.agregar = true;
  }
}
