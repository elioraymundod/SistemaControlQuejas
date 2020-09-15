import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PuntosAtencnionService } from '../Services/puntosAtencion.service';
import Swal from 'sweetalert2';
declare let $: any;

interface Opciones {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-puntos-de-atencion',
  templateUrl: './puntos-de-atencion.component.html',
  styleUrls: ['./puntos-de-atencion.component.css']
})

export class PuntosDeAtencionComponent implements OnInit {
  displayedColumns: string[] = ['region', 'nombrePuntoAtencion', 'estadoPuntoAtencion', 'accion'];
  dataSource: any;
  puntosAtencion: any[];
  modificarPuntoAtencionGroup: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private puntosAtencionService: PuntosAtencnionService,
              private _formBuilder: FormBuilder,
              private datePipe: DatePipe) {

    this.modificarPuntoAtencionGroup = this._formBuilder.group({
      regionControl: new FormControl (''),
      nombrePuntoAtencionControl: new FormControl (''),
      estadoPuntoAtencionControl: new FormControl (''),
      codigoPuntoAtencion: new FormControl('')
    });
  }

  ngOnInit(): void {
    
    this.puntosAtencionService.getPuntosAtencion().subscribe(res=>{
      this.puntosAtencion = res;
      this.dataSource = new MatTableDataSource(this.puntosAtencion);
      this.dataSource.paginator = this.paginator;
      console.log(this.puntosAtencion);
    },err=>{
      console.log(err);
    });
  }

  modificarPuntoAtencion(puntoAtencion) {
    $('#modificarPuntoDeAtencion').modal('show');
    console.log(puntoAtencion);
    this.modificarPuntoAtencionGroup.get('regionControl').setValue(puntoAtencion.nombre_region);
    this.modificarPuntoAtencionGroup.get('nombrePuntoAtencionControl').setValue(puntoAtencion.nombre_punto_atencion);
    this.modificarPuntoAtencionGroup.get('estadoPuntoAtencionControl').setValue(puntoAtencion.codigo_estado);
    this.modificarPuntoAtencionGroup.get('codigoPuntoAtencion').setValue(puntoAtencion.codigo_punto_atencion)
    //this.modificarPuntoAtencionGroup.controls['estadoPuntoAtencionControl'].setValue('5');
  } 

  guardarCambios (puntoAtencion) {
    console.log('datos a editar ', puntoAtencion)
    const puntosAtencion={
      codigo_punto_atencion:puntoAtencion.codigoPuntoAtencion,
      codigo_estado:puntoAtencion.estadoPuntoAtencionControl,
      nombre_punto_atencion:puntoAtencion.nombrePuntoAtencionControl
     }

    if(puntosAtencion.codigo_estado){
      this.puntosAtencionService.UpdatePuntoAtencion(puntosAtencion).subscribe(res=>{
        console.log(res);
      $('#modificarPuntoDeAtencion').modal('hide');
       //this.refrescarTabla();
       Swal.fire({
        titleText: 'Se han actualizado los datos con éxito',
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false
      });
     },err=>{
       console.error(err);
     });
     }
     
    /*else{
      this.usuariosServices.getTotalUsuariosByOficina(puntoAtencion.codigo_oficina).subscribe(res=>{
        this.totalUsuarios=res[0].totalUsuarios;
        console.log(this.totalUsuarios);
        if(this.totalUsuarios>0){
          this.cancelarEditar();
          $('#Editar').modal('hide');
          $('#ErrorUsuariosOficina').modal('show');
          
        }else{
          this.oficinaServices.UpdateOficina(oficinas).subscribe(res=>{
            console.log(res);
           $('#Editar').modal('hide');
           this.datosGuardados=true;
           this.mensajeRegAct="Datos actualizados";
         },err=>{
           console.error(err);
         }); 
        }
      },err=>{
        console.log(err);
      }) ;
     }*/
  }

  refrescarTabla(){
    const filtrarValor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtrarValor.trim().toLocaleLowerCase();
  }


  estados: Opciones [] = [
    {value: 5, viewValue: 'Activo'},
    {value: 6, viewValue: 'Inactivo'}
  ];
}


