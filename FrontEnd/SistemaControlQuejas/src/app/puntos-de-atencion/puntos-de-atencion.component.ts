import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PuntosAtencnionService } from '../Services/puntosAtencion.service';
import Swal from 'sweetalert2';
import { CdkVirtualForOf } from '@angular/cdk/scrolling';
import * as moment from 'moment';
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
  date: Date;
  modificarPuntoAtencionGroup: FormGroup;
  filtroRegionesGroup: FormGroup;
  crearPuntoAtencionGroup: FormGroup;
  contInterno: number;
  contExterno: number;
  cambiarEstado: boolean;
  codigoRegion: number;

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

    this.filtroRegionesGroup = this._formBuilder.group({
      regionesControl: new FormControl ('')
    });

    this.crearPuntoAtencionGroup = this._formBuilder.group({
      regionesControl: new FormControl (''),
      nombrePuntoAtencionControl: new FormControl ('')
    });
    this.date = new Date();
  }

  ngOnInit(): void {
    // Obtener los puntos de atencion de base de datos
    this.refrescarTabla();
    // Indicar que se inicie con la region central seleccionada por defecto
    this.filtroRegionesGroup.get('regionesControl').setValue('Region Central');
    console.log('La fecha es ', this.date)
  }

  // Metodo para abrir el modal de modificar y enviar los datos de un punto de atencion seleccionado
  modificarPuntoAtencion(puntoAtencion): void {
    $('#modificarPuntoDeAtencion').modal('show');
    console.log(puntoAtencion);
    this.modificarPuntoAtencionGroup.get('regionControl').setValue(puntoAtencion.nombre_region);
    this.modificarPuntoAtencionGroup.get('nombrePuntoAtencionControl').setValue(puntoAtencion.nombre_punto_atencion);
    this.modificarPuntoAtencionGroup.get('estadoPuntoAtencionControl').setValue(puntoAtencion.codigo_estado);
    this.modificarPuntoAtencionGroup.get('codigoPuntoAtencion').setValue(puntoAtencion.codigo_punto_atencion);
  }

  // Metodo para limpiar los campos de un formulario
  limpiarDatos(): void {
    this.crearPuntoAtencionGroup.reset();
  }

  // Metodo para guardar los cambios al modificar un punto de atencion
  guardarCambios(puntoAtencion): void {
    switch (puntoAtencion.regionControl) {
      case 'Región Central':
        this.codigoRegion = 1;
        break;
      case 'Región Sur':
        this.codigoRegion = 2;
        break;
      case 'Región Nororiente':
        this.codigoRegion = 3;
        break;
      case 'Región Occidente':
        this.codigoRegion = 4;
        break;
    }
    this.puntosAtencionService.getPuntosAtencionByNombre(puntoAtencion.nombrePuntoAtencionControl, this.codigoRegion).subscribe(res => {
      if (res.length !== 0) {
        Swal.fire({
          titleText: `El punto de atencion que desea ingresar ya existe`,
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false
        });
      }else {
        if (puntoAtencion.estadoPuntoAtencionControl === 6) {
          // tslint:disable-next-line: no-shadowed-variable
          this.puntosAtencionService.getPuntosAtencionExternosInternosByCodigoPunto(puntoAtencion.codigoPuntoAtencion).subscribe(res => {
            if (res.length === 0) {
              console.log('datos a editar ', puntoAtencion)
              const puntosAtencion = {
                codigo_punto_atencion: puntoAtencion.codigoPuntoAtencion,
                codigo_estado: puntoAtencion.estadoPuntoAtencionControl,
                nombre_punto_atencion: puntoAtencion.nombrePuntoAtencionControl,
                fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd')
              };
              if (puntosAtencion.codigo_estado){
                this.puntosAtencionService.UpdatePuntoAtencion(puntosAtencion).subscribe(res => {
                  console.log(res);
                  $('#modificarPuntoDeAtencion').modal('hide');
                  // this.refrescarTabla();
                  Swal.fire({
                  titleText: `Datos actualizados.`,
                  icon: 'success',
                  showCloseButton: true,
                  showConfirmButton: false
                });
                  this.refrescarTabla();
              }, err => {
                console.error(err);
              });
              }
              this.refrescarTabla();
            } else {
              let externo = 0;
              const interno = res[0].conteo_interno;
              this.contInterno = interno;
              // tslint:disable-next-line: forin
              for (let i in res) {
                externo += res[i].conteo_externo;
              }
              this.contExterno = externo;

              if (this.contExterno > 0) {
                Swal.fire({
                  titleText: `No se puede desactivar este punto de atención porque contiene usuarios activos en otros puntos de atención.`,
                  icon: 'error',
                  showCloseButton: true,
                  showConfirmButton: false
                });
                this.cambiarEstado = false;
              } else if (this.contExterno == 0){
                $('#modificarPuntoDeAtencion').modal('hide');
                $('#confirmacionDeInactivacion').modal('show');
                // inactivar u suarios
                // this.inactivarUsuarios(puntoAtencion.codigoPuntoAtencion);
              }
            }
          }, err => {
            console.error(err);
          });
        } else {
          console.log('datos a editar ', puntoAtencion)
          const puntosAtencion = {
            codigo_punto_atencion: puntoAtencion.codigoPuntoAtencion,
            codigo_estado: puntoAtencion.estadoPuntoAtencionControl,
            nombre_punto_atencion: puntoAtencion.nombrePuntoAtencionControl,
            fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd')
          };
          if(puntosAtencion.codigo_estado){
            this.puntosAtencionService.UpdatePuntoAtencion(puntosAtencion).subscribe(res => {
              console.log(res);
              $('#modificarPuntoDeAtencion').modal('hide');
              Swal.fire({
              titleText: `Datos actualizados.`,
              icon: 'success',
              showCloseButton: true,
              showConfirmButton: false
            });
              this.refrescarTabla();
          }, err => {
            console.error(err);
          });
          }
          this.refrescarTabla();
        }
      }
    }, err => {
      console.error(err);
    });
  }

  // Metodo para inactivar los usuarios
  inactivarUsuarios() {
    $('#confirmacionDeInactivacion').modal('hide');
    const usuario = {
      codigo_estado: 6,
      codigo_punto: this.modificarPuntoAtencionGroup.get('codigoPuntoAtencion').value
    }
    console.log(usuario)
    this.puntosAtencionService.inactivarUsuarios(usuario).subscribe(res=>{
      Swal.fire({
        titleText: `Se inactivó correctamente el punto de atencion y los usuarios que contenía.`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false
      });
    }, err=>{

    });

    const puntosAtencion={
      codigo_punto_atencion: this.modificarPuntoAtencionGroup.get('codigoPuntoAtencion').value,
      codigo_estado: this.modificarPuntoAtencionGroup.get('estadoPuntoAtencionControl').value,
      nombre_punto_atencion: this.modificarPuntoAtencionGroup.get('nombrePuntoAtencionControl').value
    }

    if(puntosAtencion.codigo_estado){
      this.puntosAtencionService.UpdatePuntoAtencion(puntosAtencion).subscribe(res=>{
        console.log(res);
      this.refrescarTabla();
    },err=>{
      console.error(err);
    });
    }
    this.refrescarTabla();
  }

  // Metodo para cancelar la inactivacion de los usuarios
  noInactivarUsuarios(){
    $('#modificarPuntoDeAtencion').modal('show');
  }

  // Metodo para abrir el modal para crear un punto de atencion
  agregarPuntoAtencion() {
    $('#crearPuntoDeAtencion').modal('show');
  }

  // Metodo para guardar un punto de atencion
  guardarPuntoAtencion(puntoAtencion) {
    console.log(puntoAtencion.regionesControl)
    if (puntoAtencion != null) {
      this.puntosAtencionService.getPuntosAtencionByNombre(puntoAtencion.nombrePuntoAtencionControl, puntoAtencion.regionesControl).subscribe(res=>{
        console.log(res)
        if (res.length != 0) {
          Swal.fire({
            titleText: `El punto de atencion que desea ingresar ya existe`,
            icon: 'error',
            showCloseButton: true,
            showConfirmButton: false
          });
        }else {
          const punto = {
            codigo_punto_atencion: 0,
            codigo_region: this.crearPuntoAtencionGroup.get('regionesControl').value,
            codigo_estado: 5,
            nombre_punto_atencion: this.crearPuntoAtencionGroup.get('nombrePuntoAtencionControl').value,
            fecha_creacion: this.datePipe.transform(this.date, 'yyyy-MM-dd')
          };
          console.log(punto);
          this.puntosAtencionService.InsertPuntoAtencion(punto).subscribe(res=>{
            $('#crearPuntoDeAtencion').modal('hide');
            this.crearPuntoAtencionGroup.reset();
            Swal.fire({
              titleText: `Se guardaron correctamente los datos del punto de atención ${res.length} - ${punto.nombre_punto_atencion}.`,
              icon: 'success',
              showCloseButton: true,
              showConfirmButton: false
            });
          });
          this.refrescarTabla();
        }
      })
    }
    
  }

  // Metodo para refrescar los datos en la tabla
  refrescarTabla(){
    this.puntosAtencionService.getPuntosAtencion().subscribe(res=>{
      this.puntosAtencion = res;
      this.dataSource = new MatTableDataSource(this.puntosAtencion);
      this.dataSource.paginator = this.paginator;
      console.log(this.puntosAtencion);
    },err=>{
      console.log(err);
    });
  }

  // Metodo para aplicar filtros en la tabla en base a una region seleccionada
  public aplicarFiltro (event: Event) {
    if (this.filtroRegionesGroup.get('regionesControl').value != "Todos los puntos de atención") {
      const filterValue = this.filtroRegionesGroup.get('regionesControl').value;
      this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    } else {
      this.refrescarTabla();
    }
    
  }

  // Lista de opciones de estados
  estados: Opciones [] = [
    {value: 5, viewValue: 'Activo'},
    {value: 6, viewValue: 'Inactivo'}
  ];

  // Lista de opciones de regiones
  regiones: Opciones [] = [
    {value: 1, viewValue: 'Región Central'},
    {value: 2, viewValue: 'Región Sur'},
    {value: 3, viewValue: 'Región Nororiente'},
    {value: 4, viewValue: 'Región Occidente'},
    {value: 5, viewValue: 'Todos los puntos de atención'}
  ];
}


