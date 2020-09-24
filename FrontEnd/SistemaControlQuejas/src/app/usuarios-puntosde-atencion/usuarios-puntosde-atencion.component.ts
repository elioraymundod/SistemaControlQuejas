import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsuariosPuntosdeAtencionService } from '../Services/UsuariosPuntosdeAtencion.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { strict } from 'assert';
import { PuntosAtencnionService } from '../Services/puntosAtencion.service';
import { ErrorStateMatcher } from '@angular/material/core';

declare let $: any;

interface Opciones {
  value: number;
  viewValue: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-usuarios-puntosde-atencion',
  templateUrl: './usuarios-puntosde-atencion.component.html',
  styleUrls: ['./usuarios-puntosde-atencion.component.css']


})

export class UsuariosPuntosdeAtencionComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  displayedColumns: string[] = ['nombrePuntoAtencion','usuario','correo','cargo', 'estadoUsuario', 'accion'];
  dataSource: any;
  UsuariosPuntosdeAtencion: any[];
  puntos:any[];
  PuntosAtencionPorRegion:Opciones[];
  modificarUsuarioGroup:FormGroup;
  filtroRegionesGroup: FormGroup;
  crearUsuarioGroup: FormGroup;
  codigoRegion: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private UsuariosPuntosdeAtencionService:UsuariosPuntosdeAtencionService,
    private puntosAtencionService:PuntosAtencnionService,
    private _formBuilder: FormBuilder,
              private datePipe: DatePipe) 
             
              {
    //controles para modificar al usuario
      this.modificarUsuarioGroup = this._formBuilder.group({
        correoControl: new FormControl (''),
        cargoControl: new FormControl (''),
        estadoControl: new FormControl (''),
        codigoUsuario: new FormControl('')    
     });
     this.filtroRegionesGroup = this._formBuilder.group({
      //regionesControl: new FormControl (''),
      //nombrepuntoControl: new FormControl ('')
    });
  //controles para agregar un usuario
     this.crearUsuarioGroup = this._formBuilder.group({
      correoControl: new FormControl ('', Validators.required),
      DPIControl: new FormControl('', Validators.required),
      NombreControl: new FormControl('', Validators.required),
      cargoControl: new FormControl ('', Validators.required),
      regionesControl: new FormControl ('', Validators.required),
      puntosAtencionControl: new FormControl ('', Validators.required)

     });
    }
  // Obtener los Usuarios de base de datos
  ngOnInit(): void {
    this.UsuariosPuntosdeAtencionService.getUsuariosPuntosdeAtencion().subscribe(res=>{
      this.UsuariosPuntosdeAtencion = res;
      this.dataSource = new MatTableDataSource(this.UsuariosPuntosdeAtencion);
      this.dataSource.paginator = this.paginator;
      
      
      console.log(this.UsuariosPuntosdeAtencion);
    },err=>{
      console.log(err);
    });
    // Indicar que se inicie con la region central seleccionada por defecto
    //this.filtroRegionesGroup.get('regionesControl').setValue('Region Central');
}
  // Metodo para abrir el modal de modificar y enviar los datos de un punto de atencion seleccionado
modificarUsuario(UsuarioPuntoAtencion) {
  $('#modificarUsuario').modal('show');
  console.log(UsuarioPuntoAtencion);
  this.modificarUsuarioGroup.get('correoControl').setValue(UsuarioPuntoAtencion.correo_electronico);
  this.modificarUsuarioGroup.get('cargoControl').setValue(UsuarioPuntoAtencion.codigo_cargo);
  this.modificarUsuarioGroup.get('estadoControl').setValue(UsuarioPuntoAtencion.codigo_estado); 
  this.modificarUsuarioGroup.get('codigoUsuario').setValue(UsuarioPuntoAtencion.dpi_usuario);
} 

// Metodo para guardar los cambios al modificar un usuario
guardarCambios (usuariopuntoAtencion) {
  console.log(usuariopuntoAtencion.estadoControl)
  console.log('datos a editar ', usuariopuntoAtencion)
  const PuntoAtencion={
    correo_electronico:usuariopuntoAtencion.correoControl,
    codigo_cargo:usuariopuntoAtencion.cargoControl,
    codigo_estado:usuariopuntoAtencion.estadoControl,
    dpi_usuario:usuariopuntoAtencion.codigoUsuario
  }
  if(PuntoAtencion.codigo_estado){
    this.UsuariosPuntosdeAtencionService.UpdatePuntoAtencion(PuntoAtencion).subscribe(res=>{
      console.log(res);
    $('#modificarUsuario').modal('hide');
   
     Swal.fire({
      titleText: `Datos actualizados.`,
      icon: 'success',
      showCloseButton: true,
      showConfirmButton: false
    });
    this.refrescarTabla();
   },err=>{
     console.error(err);
   });
   }
}


//Método para abrir el Modal para crear un punto de atencion
agregarunUsuario() {
  $('#crearUsuario').modal('show');

}

public aplicarFiltro (event: Event) {
  console.log(this.filtroRegionesGroup.get('regionesControl').value)
  const filterValue = this.filtroRegionesGroup.get('regionesControl').value;
 // this.filtroRegionesGroup.get('nombrepuntoControl').setValue(UsuarioPuntoAtencion.nombre_punto_atencion);
  
}

// Metodo para mostrar los puntos de atencion en base a la region seleccionada
public seleccionarRegion() {
  this.crearUsuarioGroup.get('puntosAtencionControl').reset();
  this.codigoRegion = this.crearUsuarioGroup.get('regionesControl').value;
  this.puntosAtencionService.getPuntosAtencionByCodigo(this.codigoRegion).subscribe(res=>{
  this.PuntosAtencionPorRegion = res;
  console.log(this.PuntosAtencionPorRegion)
  }, err=>{
    console.error(err);
  });

}

// Metodo para obtener el nombre y correo en base a un nit
obtenerNombreAndCorreo() {
  let dpi = this.crearUsuarioGroup.get('DPIControl').value;
  this.UsuariosPuntosdeAtencionService.getUsuarioByDpi(dpi).subscribe(res=>{
    console.log(res);
    try {
      this.crearUsuarioGroup.get('NombreControl').setValue(res[0].nombre);
      this.crearUsuarioGroup.get('correoControl').setValue(res[0].correo_electronico);
    } catch(e) {
      this.crearUsuarioGroup.get('NombreControl').reset();
      this.crearUsuarioGroup.get('correoControl').reset();
      Swal.fire({
        titleText: `El DPI ingresado no es valido`,
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: false
      });
    }
  }, err=>{
    console.error(err);
  })
}


//listado de opciones para estados
estados: Opciones [] = [
  {value: 5, viewValue: 'Activo'},
  {value: 6, viewValue: 'Inactivo'}
];
// Lista de opciones de cargos para los usuarios
CargoUsuario: Opciones [] = [
  {value: 14, viewValue: 'Titular del punto de atención'},
  {value: 15, viewValue: 'Suplente'},
  {value: 16, viewValue: 'Encargado'},
  {value: 17, viewValue: 'Jefe inmediato'},
  {value: 18, viewValue: 'Receptor de quejas'},
  {value: 19, viewValue: 'Centralizador de quejas'}
];
//lista de opciones de las Regiones 
regiones: Opciones [] = [
  {value: 1, viewValue: 'Región Central'},
  {value: 2, viewValue: 'Región Sur'},
  {value: 3, viewValue: 'Región Nororiente'},
  {value: 4, viewValue: 'Región Occidente'}
];

  //Actualizar Datos Tabla
  refrescarTabla(){
    this.UsuariosPuntosdeAtencionService.getUsuariosPuntosdeAtencion().subscribe(res=>{
    this.UsuariosPuntosdeAtencion = res;
    this.dataSource = new MatTableDataSource(this.UsuariosPuntosdeAtencion);
    console.log(this.UsuariosPuntosdeAtencion);
    },err=>{
    console.log(err);
    });
  }

}
