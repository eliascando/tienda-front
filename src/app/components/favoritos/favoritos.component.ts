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
  selector: 'app-favoritos',
  standalone: true,
  imports: [PrimengModule, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [ConfirmationService, MessageService, ApiService, DialogService],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {
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
    this.endpoint_get = 'Producto/deseados'
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


  openNew() {
    this.agregar = true;
  }
}
