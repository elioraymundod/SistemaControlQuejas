import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TiposQuejasService } from '../Services/tipos-quejas.service';
declare let $: any;

interface Opciones {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-tipos-de-quejas',
  templateUrl: './tipos-de-quejas.component.html',
  styleUrls: ['./tipos-de-quejas.component.css']
})
export class TiposDeQuejasComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  constructor(private _formBuilder: FormBuilder, private tiposQuejasService: TiposQuejasService,
              private datePipe: DatePipe,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.crearTipoQuejaGroup = this._formBuilder.group({
      siglasControl: new FormControl('', Validators.required),
      descripcionControl: new FormControl('', Validators.required)
    });

    this.modificarTipoQuejaGroup = this._formBuilder.group({
      descripcionControl: new FormControl('', Validators.required),
      estadoControl: new FormControl('', Validators.required)
    });

    this.date = new Date();
  }

  // FormGroups
  crearTipoQuejaGroup: FormGroup;
  modificarTipoQuejaGroup: FormGroup;

  // Variables
  tiposQuejas: any;
  dataSource: any;
  displayedColumns: string[] = ['siglas', 'descripcion', 'estado', 'accion'];
  date: Date;
  rol: string;
  dpi: string;
  nuevoTipoQueja: any;
  datosActualizar: any;
  tipoQueja: any;
  codigoTipoQueja: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Lista de opciones de estados
  estados: Opciones [] = [
    {value: 5, viewValue: 'Activo'},
    {value: 6, viewValue: 'Inactivo'}
  ];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async res => {
      console.log('el res es ', res);
      if (res.has('dpi')) {
        this.dpi = res.get('dpi');
      }
      if (res.has('rol')) {
        this.rol = res.get('rol');
      }
    });
    this.obtenerTiposQuejas();
  }

  // Metodo para mostrar el modal para crear un tipo de queja
  modalAgregarTipoQueja(): void {
    $('#crearTipoQueja').modal('show');
    $('#crearTipoQueja').modal('hide');
  }

    // Metodo para volver al menu principal
    menuPrincipal(): void {
      console.log(this.rol, ' ', this.dpi);
      this.router.navigate(['menu-principal/', this.rol, this.dpi]);
    }

  // Metodo para guardar un tipo de queja ingresado
  guardarTipoQueja(): void {
    const tipoQueja = {
      codigo_tipo_queja: 0,
      codigo_estado: 5,
      siglas: this.nuevoTipoQueja.siglasControl,
      descripcion_tipo_queja: this.nuevoTipoQueja.descripcionControl,
      // tslint:disable-next-line: quotemark
      fecha_creacion: this.datePipe.transform(this.date, "yyyy-MM-dd"),
      fecha_modificacion: null
    };
    this.tiposQuejasService.insertTipoQueja(tipoQueja).subscribe(res => {
      Swal.fire({
        titleText: `El tipo de queja "${tipoQueja.siglas}" - "${tipoQueja.descripcion_tipo_queja}", fue guardado correctamente`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false
      });
      $('#confirmacionGuardar').modal('hide');
      $('#crearTipoQueja').modal('hide');
      this.limpiarDatos();
    }, err => {
      console.error(err);
    });
    this.obtenerTiposQuejas();
  }

  // Metodo para mostrar la confirmacion si desea guardar la queja el tipo de queja
  confirmarCrearTipoQueja(datos): void {
    this.tiposQuejasService.getTiposQuejasBySiglas(datos.siglasControl).subscribe(res => {
      if (res.length > 0) {
        Swal.fire({
          titleText: `Las siglas para la queja que ingresó, ya fueron registradas previamente en el sistema, verifique.`,
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false
        });
      } else {
        this.nuevoTipoQueja = datos;
        $('#confirmacionGuardar').modal('show');
      }
    }, err => {
      console.error(err);
    });
  }

  // Metodo para limpiar datos de los formularios
  limpiarDatos(): void {
    this.crearTipoQuejaGroup.reset();
  }

  // Metodo para obtener los tipos de quejas de base de datos
  obtenerTiposQuejas(): void{
    this.tiposQuejasService.getTiposQuejas().subscribe(res => {
      this.tiposQuejas = res;
      this.dataSource = new MatTableDataSource(this.tiposQuejas);
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.error(err);
    });
  }

  // Metodo para mostrar el modal para modificar un tipo de queja
  modalModificarTipoQueja(datos): void{
    $('#modificarTipoQueja').modal('show');
    this.modificarTipoQuejaGroup.get('descripcionControl').setValue(datos.descripcion_tipo_queja);
    this.modificarTipoQuejaGroup.get('estadoControl').setValue(datos.codigo_estado);
    this.tipoQueja = datos.codigo_tipo_queja;
    this.codigoTipoQueja = datos.codigo_tipo_queja;
    console.log('los datos que trae son ', datos);
  }

  // Metodo para mostrar la confirmacion si desea modificar el tipo de queja
  confirmarModificacionTipoQueja(datos): void {
    this.datosActualizar = datos;
    console.log('datos a actualizar', this.datosActualizar);
    $('#confirmacionModificar').modal('show');
  }

  // Consultar si existen quejas con el tipo de queja
  consultarQuejasByTiposQuejas(): void {
    this.tiposQuejasService.getQuejasByTipoQueja(this.tipoQueja).subscribe(res => {
      if (res.length === 0) {
        this.modificarTipoQuejaGroup.get('descripcionControl').setValue('');
      }
    }, err => {
      console.error(err);
    });
  }

  // Metodo para actualizar el tipo de queja
  actualizarTipoQueja(): void {
    const datosParaActualizar = {
      codigo_estado: this.datosActualizar.estadoControl,
      descripcion_tipo_queja: this.datosActualizar.descripcionControl,
      // tslint:disable-next-line: quotemark
      fecha_modificacion: this.datePipe.transform(this.date, "yyyy-MM-dd"),
      codigo_tipo_queja: this.codigoTipoQueja
    };
    this.tiposQuejasService.updateTipoQueja(datosParaActualizar).subscribe(res => {
      Swal.fire({
        titleText: `Datos actualizados.`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false
      });
      this.obtenerTiposQuejas();
      $('#confirmacionModificar').modal('hide');
      $('#modificarTipoQueja').modal('hide');
    }, err => {
      console.error(err);
    });
  }
}
