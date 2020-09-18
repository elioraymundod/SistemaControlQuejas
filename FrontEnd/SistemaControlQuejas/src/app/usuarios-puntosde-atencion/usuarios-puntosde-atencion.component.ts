import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsuariosPuntosdeAtencionService } from '../Services/UsuariosPuntosdeAtencion.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
declare let $: any;
interface Opciones {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-usuarios-puntosde-atencion',
  templateUrl: './usuarios-puntosde-atencion.component.html',
  styleUrls: ['./usuarios-puntosde-atencion.component.css']
})

export class UsuariosPuntosdeAtencionComponent implements OnInit {
  displayedColumns: string[] = ['region', 'nombrePuntoAtencion','usuario','correo','cargo', 'estadoUsuario', 'accion'];
  dataSource: any;
  UsuariosPuntosdeAtencion: any[];
  modificarUsuarioGroup:FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private UsuariosPuntosdeAtencionService:UsuariosPuntosdeAtencionService,
    private _formBuilder: FormBuilder,
              private datePipe: DatePipe) 
             
              {
      this.modificarUsuarioGroup = this._formBuilder.group({
        correoControl: new FormControl (''),
        cargoControl: new FormControl (''),
        estadoControl: new FormControl ('')
     });
    }

  ngOnInit(): void {
    this.UsuariosPuntosdeAtencionService.getUsuariosPuntosdeAtencion().subscribe(res=>{
      this.UsuariosPuntosdeAtencion = res;
      this.dataSource = new MatTableDataSource(this.UsuariosPuntosdeAtencion);
      this.dataSource.paginator = this.paginator;
      console.log(this.UsuariosPuntosdeAtencion);
    },err=>{
      console.log(err);
    });
}

modificarUsuario(UsuarioPuntoAtencion) {
  $('#modificarUsuario').modal('show');
  console.log(UsuarioPuntoAtencion);
 
 this.modificarUsuarioGroup.get('correoControl').setValue("holaa");
// this.modificarUsuarioGroup.get('cargoControl').setValue(UsuarioPuntoAtencion.codigo_cargo);
 // this.modificarUsuarioGroup.get('estadoControl').setValue(UsuarioPuntoAtencion.codigo_estado);
} 

estados: Opciones [] = [
  {value: 5, viewValue: 'Activo'},
  {value: 6, viewValue: 'Inactivo'}
];

}