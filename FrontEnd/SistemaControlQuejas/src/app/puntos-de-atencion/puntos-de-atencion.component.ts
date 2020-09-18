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
  date: Date;
  modificarPuntoAtencionGroup: FormGroup;
  filtroRegionesGroup: FormGroup;
  crearPuntoAtencionGroup: FormGroup;

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
    this.puntosAtencionService.getPuntosAtencion().subscribe(res=>{
      this.puntosAtencion = res;
      this.dataSource = new MatTableDataSource(this.puntosAtencion);
      this.dataSource.paginator = this.paginator;
      console.log(this.puntosAtencion);
    },err=>{
      console.log(err);
    });
    // Indicar que se inicie con la region central seleccionada por defecto
    this.filtroRegionesGroup.get('regionesControl').setValue('Region Central');
  }

  // Metodo para abrir el modal de modificar y enviar los datos de un punto de atencion seleccionado
  modificarPuntoAtencion(puntoAtencion) {
    $('#modificarPuntoDeAtencion').modal('show');
    console.log(puntoAtencion);
    this.modificarPuntoAtencionGroup.get('regionControl').setValue(puntoAtencion.nombre_region);
    this.modificarPuntoAtencionGroup.get('nombrePuntoAtencionControl').setValue(puntoAtencion.nombre_punto_atencion);
    this.modificarPuntoAtencionGroup.get('estadoPuntoAtencionControl').setValue(puntoAtencion.codigo_estado);
    this.modificarPuntoAtencionGroup.get('codigoPuntoAtencion').setValue(puntoAtencion.codigo_punto_atencion);
  } 

  // Metodo para guardar los cambios al modificar un punto de atencion
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

  // Metodo para abrir el modal para crear un punto de atencion
  agregarPuntoAtencion() {
    $('#crearPuntoDeAtencion').modal('show');
  }

  // Metodo para guardar un punto de atencion
  guardarPuntoAtencion(puntoAtencion) {
    if (puntoAtencion != null) {
      const punto = {
        codigo_punto_atencion: 0,
        codigo_region: this.crearPuntoAtencionGroup.get('regionesControl').value,
        codigo_estado: 5,
        nombre_punto_atencion: this.crearPuntoAtencionGroup.get('nombrePuntoAtencionControl').value,
        fecha_creacion: this.datePipe.transform(this.date, "yyyy-MM-dd")
      }
      console.log(punto);
      this.puntosAtencionService.InsertPuntoAtencion(punto).subscribe(res=>{
        $('#crearPuntoDeAtencion').modal('hide');
        this.crearPuntoAtencionGroup.reset();
        Swal.fire({
          titleText: `Se guardaron correctamente los datos del punto de atención ${punto.codigo_punto_atencion} - ${punto.nombre_punto_atencion}.`,
          icon: 'success',
          showCloseButton: true,
          showConfirmButton: false
        });
      })
    }
  }

  refrescarTabla(){
    const filtrarValor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtrarValor.trim().toLocaleLowerCase();

  }

  // Metodo para aplicar filtros en la tabla en base a una region seleccionada
  public aplicarFiltro (event: Event) {
    console.log(this.filtroRegionesGroup.get('regionesControl').value)
    const filterValue = this.filtroRegionesGroup.get('regionesControl').value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
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
    {value: 4, viewValue: 'Región Occidente'}
  ];
}


