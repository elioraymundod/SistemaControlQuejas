import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsuariosPuntosdeAtencionService } from '../Services/UsuariosPuntosdeAtencion.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { strict } from 'assert';
import { PuntosAtencnionService } from '../Services/puntosAtencion.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  constructor(private UsuariosPuntosdeAtencionService: UsuariosPuntosdeAtencionService,
              private puntosAtencionService: PuntosAtencnionService,
              private _formBuilder: FormBuilder,
              private datePipe: DatePipe) {
    // controles para modificar al usuario
    this.modificarUsuarioGroup = this._formBuilder.group({
      correoControl: new FormControl(''),
      cargoControll: new FormControl(''),
      estadoControl: new FormControl(''),
      codigoUsuario: new FormControl(''),
      codigoUsuarioPunto: new FormControl(''),
      dpiControl: new FormControl('')
    });
    // controles para mostrar datos en base a la region seleccionada
    this.filtroRegionesGroup = this._formBuilder.group({
      regionesControl: new FormControl(''),
    });
    // controles para agregar un usuario
    this.crearUsuarioGroup = this._formBuilder.group({
      correoControl: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),Validators.required,]),
      DPIControl: new FormControl('', Validators.required),
      NombreControl: new FormControl('', Validators.required),
      cargoControl: new FormControl('', Validators.required),
      regionesControl: new FormControl('', Validators.required),
      puntosAtencionControl: new FormControl('', Validators.required),
      cargooControlObtenido: new FormControl(''),
      codigoUsuarioPunto: new FormControl('')

    });
    this.date = new Date();

    
  }
  displayedColumns: string[] = ['nombrePuntoAtencion', 'usuario', 'correo', 'cargo', 'estadoUsuario', 'accion'];
  dataSource: any;
  UsuariosPuntosdeAtencion: any[];
  puntos: any[];
  PuntosAtencionPorRegion: Opciones[];
  modificarUsuarioGroup: FormGroup;
  filtroRegionesGroup: FormGroup;
  crearUsuarioGroup: FormGroup;
  codigoRegion: number;
  date: Date;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  // listado de opciones para estados
  // tslint:disable-next-line:member-ordering
  estados: Opciones[] = [
    { value: 5, viewValue: 'Activo' },
    { value: 6, viewValue: 'Inactivo' }
  ];
  // Lista de opciones de cargos para los usuarios
  // tslint:disable-next-line:member-ordering
  CargoUsuario: Opciones[] = [
    { value: 14, viewValue: 'Titular del punto de atención' },
    { value: 15, viewValue: 'Suplente' },
    { value: 16, viewValue: 'Encargado' },
    { value: 17, viewValue: 'Jefe inmediato' },
    { value: 18, viewValue: 'Receptor de quejas' },
    { value: 19, viewValue: 'Centralizador de quejas' }
  ];
  // lista de opciones de las Regiones 
  regiones: Opciones [] = [
    {value: 1, viewValue: 'Región Central'},
    {value: 2, viewValue: 'Región Sur'},
    {value: 3, viewValue: 'Región Nororiente'},
    {value: 4, viewValue: 'Región Occidente'}
  ];

  // Obtener los Usuarios de base de datos
  ngOnInit(): void {
    this.UsuariosPuntosdeAtencionService.getUsuariosPuntosdeAtencion().subscribe(res => {
      this.UsuariosPuntosdeAtencion = res;
      this.dataSource = new MatTableDataSource(this.UsuariosPuntosdeAtencion);
      this.dataSource.paginator = this.paginator;   
      console.log(this.UsuariosPuntosdeAtencion);
    }, err => {
      console.log(err);
    });
    // Indicar que se inicie con la region central seleccionada por defecto
    this.filtroRegionesGroup.get('regionesControl').setValue('Region Central');
  }

  // Metodo para limpiar datos de los formularios
  limpiarDatos(): void {
    this.crearUsuarioGroup.reset();
  }
  // Metodo para abrir el modal de modificar y enviar los datos de un punto de atencion seleccionado
  // tslint:disable-next-line:typedef
  modificarUsuario(UsuarioPuntoAtencion) {
    $('#modificarUsuario').modal('show');
    this.modificarUsuarioGroup.get('correoControl').setValue(UsuarioPuntoAtencion.correo_electronico);
    this.modificarUsuarioGroup.get('cargoControll').setValue(UsuarioPuntoAtencion.codigo_cargo);
    this.modificarUsuarioGroup.get('estadoControl').setValue(UsuarioPuntoAtencion.codigo_estado);
    this.modificarUsuarioGroup.get('codigoUsuario').setValue(UsuarioPuntoAtencion.dpi_usuario);
    this.modificarUsuarioGroup.get('codigoUsuarioPunto').setValue(UsuarioPuntoAtencion.codigo_usuario_punto);
    this.modificarUsuarioGroup.get('dpiControl').setValue(UsuarioPuntoAtencion.dpi_usuario);
  }

  // Metodo para guardar los cambios al modificar un usuario
  // tslint:disable-next-line:typedef
  guardarCambios(usuariopuntoAtencion) {
    // tslint:disable-next-line:max-line-length
    if (usuariopuntoAtencion.cargoControll == 14 || usuariopuntoAtencion.cargoControll == 15 || usuariopuntoAtencion.cargoControll == 16 || usuariopuntoAtencion.cargoControll == 18 || usuariopuntoAtencion.cargoControll == 19 || usuariopuntoAtencion.dPIControl==17) {//
      console.log("el dpi perron es " + usuariopuntoAtencion.dpiControl)
      this.UsuariosPuntosdeAtencionService.getUsuarioActivoEnOtroPunto(usuariopuntoAtencion.dpiControl).subscribe(res => {
        if (res.length != 0) {
        if (usuariopuntoAtencion.cargoControll == 17 || usuariopuntoAtencion.codigoUsuarioPunto==usuariopuntoAtencion.codigoUsuarioPunto) {
          this.UsuariosPuntosdeAtencionService.getUsuarioActivoEnOtroPunto(usuariopuntoAtencion.codigoUsuarioPunto).subscribe(res => {
            console.log(res.length);
            if ( res.length != 0) {
              console.log(res);
              Swal.fire({
                titleText: `Error al guardar los datos, el usuario ya existe en este punto de atencion "${res[0].nombre_punto}"`,
                icon: 'error',
                showCloseButton: true,
                showConfirmButton: false
              });
            }
            else {
              const PuntoAtencion = {
                codigo_usuario_punto: usuariopuntoAtencion.codigoUsuarioPunto,
                correo_electronico: usuariopuntoAtencion.correoControl,
                codigo_cargo: usuariopuntoAtencion.cargoControll,
                codigo_estado: usuariopuntoAtencion.estadoControl,
                dpi_usuario: usuariopuntoAtencion.codigoUsuario,
               fecha_creacion: this.datePipe.transform(this.date, "yyyy-MM-dd"),
                fecha_modificacion: this.datePipe.transform(this.date, "yyyy-MM-dd")
              };
              this.UsuariosPuntosdeAtencionService.UpdatePuntoAtencion(PuntoAtencion).subscribe(res => {
                console.log(res);
                $('#modificarUsuario').modal('hide');
                Swal.fire({
                  titleText: `Se modificaron correctamente los datos del usuario del punto de atención.`,
                  icon: 'success',
                  showCloseButton: true,
                  showConfirmButton: false
                });
                this.refrescarTabla();
              }, err => {
                console.error(err);
              });
            }
          }, err => {
            console.error(err);
          });
        } else {
          const PuntoAtencion = {
            codigo_usuario_punto: usuariopuntoAtencion.codigoUsuarioPunto,
            correo_electronico: usuariopuntoAtencion.correoControl,
            codigo_cargo: usuariopuntoAtencion.cargoControll,
            codigo_estado: usuariopuntoAtencion.estadoControl,
            dpi_usuario: usuariopuntoAtencion.codigoUsuario,
            // fecha_creacion: "",
            fecha_modificacion: this.datePipe.transform(this.date, "yyyy-MM-dd")
          }
          this.UsuariosPuntosdeAtencionService.UpdatePuntoAtencion(PuntoAtencion).subscribe( res => {
            console.log(res);
            $('#modificarUsuario').modal('hide');

            Swal.fire({
              titleText: `Se modificaron correctamente los datos del usuario del punto de atención.`,
              icon: 'success',
              showCloseButton: true,
              showConfirmButton: false
            });
            this.refrescarTabla();
          }, err => {
            console.error(err);
          });

        }
      } else {
        Swal.fire({
          titleText: `El usuario que intenta ingresar ya esta activo en este punto de atencion con un cargo asignado.`,
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false
        });
      }
    }, err => {
      console.error(err);
    });
  }
}

  // Método para abrir el Modal para crear un punto de atencion
  // tslint:disable-next-line:typedef
  public agregarunUsuario() {
    $('#crearUsuario').modal('show');

  }


  // tslint:disable-next-line:typedef
  public guardarUsuario(data) {
    this.UsuariosPuntosdeAtencionService.getUsuarioByDpiAndCodigoPunto(data.DPIControl, data.puntosAtencionControl).subscribe(res=>{
      console.log("el res perron es ")
      console.log (res)
      if (res.length == 0){
          // tslint:disable-next-line:max-line-length
          if (data.cargoControl == 14 || data.cargoControl == 15 || data.cargoControl == 16 || data.cargoControl == 18 || data.cargoControl == 19 || data.DPIControl==17) {
            this.UsuariosPuntosdeAtencionService.getUsuarioActivoEnOtroPunto(data.DPIControl).subscribe(res => {
              if (res.length != 0) {
                console.log(res)
                Swal.fire({
                  titleText: `Error al guardar los datos, el usuario ya existe en el punto de atención "${res[0].nombre_punto}"`,
                  icon: 'error',
                  showCloseButton: true,
                  showConfirmButton: false
                });
              } else {
                const usuario = {
                  codigo_usuario_punto: 0,
                  codigo_estado: 5,
                  codigo_punto: data.puntosAtencionControl,
                  dpi_usuario: data.DPIControl,
                  codigo_cargo: data.cargoControl,
                  correo_electronico: data.correoControl,
                  fecha_creacion: this.datePipe.transform(this.date, "yyyy-MM-dd"),
                  fecha_modificacion: this.datePipe.transform(this.date, "yyyy-MM-dd")
                }

                this.UsuariosPuntosdeAtencionService.insertUsuarioPuntoAtencion(usuario).subscribe( res => {
                  $('#crearUsuario').modal('hide');
                  this.crearUsuarioGroup.reset();
                  Swal.fire({
                    titleText: `Se guardaron correctamente los datos del usuario para el punto de atención`,
                    icon: 'success',
                    showCloseButton: true,
                    showConfirmButton: false
                  });
                  this.refrescarTabla();
                }, err => {
                  console.error(err)
                })
              }
            }, err => {
              console.error(err)
            })
          } else {
            const usuario = {
              codigo_usuario_punto: 0,
              codigo_estado: 5,
              codigo_punto: data.puntosAtencionControl,
              dpi_usuario: data.DPIControl,
              codigo_cargo: data.cargoControl,
              correo_electronico: data.correoControl,
              fecha_creacion: this.datePipe.transform(this.date, "yyyy-MM-dd"),
              fecha_modificacion: this.datePipe.transform(this.date, "yyyy-MM-dd")
            }
            this.UsuariosPuntosdeAtencionService.insertUsuarioPuntoAtencion(usuario).subscribe( res => {
              $('#crearUsuario').modal('hide');
              this.crearUsuarioGroup.reset();
              Swal.fire({
                titleText: `Se guardaron correctamente los datos del usuario para el punto de atención`,
                icon: 'success',
                showCloseButton: true,
                showConfirmButton: false
              });
              this.refrescarTabla();
            }, err => {
              console.error(err)
            })
          }

          this.refrescarTabla();
     }   else {
        Swal.fire({
          titleText: `El usuario que intenta ingresar ya esta activo en este punto de atencion con un cargo asignado.`,
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false
        });
      }
    }, err=>{
      console.error(err)
    })


  }

  // tslint:disable-next-line:typedef
  public aplicarFiltro (event: Event) {
    console.log(this.filtroRegionesGroup.get('regionesControl').value)
    const filterValue = this.filtroRegionesGroup.get('regionesControl').value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }


  // Metodo para mostrar los puntos de atencion en base a la region seleccionada
  // tslint:disable-next-line:typedef
  public seleccionarRegion() {
    this.crearUsuarioGroup.get('puntosAtencionControl').reset();
    this.codigoRegion = this.crearUsuarioGroup.get('regionesControl').value;
    this.puntosAtencionService.getPuntosAtencionByCodigo(this.codigoRegion).subscribe(res => {
      this.PuntosAtencionPorRegion = res;
      console.log(this.PuntosAtencionPorRegion)
    }, err => {
      console.error(err);
    });

  }
  // Metodo para obtener el valor del Cargo Seleccionado en crear usuario
  // tslint:disable-next-line:typedef
  public seleccionarCargo() {
    console.log(this.crearUsuarioGroup.get('cargoControl').value)

  }
   // Metodo para obtener el valor del Cargo Seleccionado en modificar usuario
  // tslint:disable-next-line:typedef
  public seleccionarCargoo() {
    console.log(this.modificarUsuarioGroup.get('cargoControll').value)
  }
  // Metodo para obtener el nombre y correo en base a un nit
  // tslint:disable-next-line:typedef
  obtenerNombreAndCorreo() {
    let dpi = this.crearUsuarioGroup.get('DPIControl').value;
    this.UsuariosPuntosdeAtencionService.getUsuarioByDpi(dpi).subscribe(res => {
      console.log(res);
      try {
        this.crearUsuarioGroup.get('NombreControl').setValue(res[0].nombre);
        this.crearUsuarioGroup.get('correoControl').setValue(res[0].correo_electronico);
      } catch (e) {
        this.crearUsuarioGroup.get('NombreControl').reset();
        this.crearUsuarioGroup.get('correoControl').reset();
        Swal.fire({
          titleText: `El DPI ingresado no es valido`,
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false
        });
      }
    }, err => {
      console.error(err);
    })
  }

  // Actualizar Datos Tabla
  // tslint:disable-next-line:typedef
  refrescarTabla() {
    this.UsuariosPuntosdeAtencionService.getUsuariosPuntosdeAtencion().subscribe(res => {
      this.UsuariosPuntosdeAtencion = res;
      this.dataSource = new MatTableDataSource(this.UsuariosPuntosdeAtencion);
      console.log(this.UsuariosPuntosdeAtencion);
    }, err => {
      console.log(err);
    });
  }

}

