import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IngresoQuejaPorUsuarioService } from '../Services/IngresoQuejaPorUsuario.service';
import { LoginComponent } from '../login/login.component';
import { EnvioCorreoService } from '../Services/envio-correo.service';

declare let $: any;



@Component({
  selector: 'app-ingreso-queja-por-usuario',
  templateUrl: './ingreso-queja-por-usuario.component.html',
  styleUrls: ['./ingreso-queja-por-usuario.component.css']
})
export class IngresoQuejaPorUsuarioComponent implements OnInit {

  // FormGroups
  CrearQuejaGroup: FormGroup;

  // Variables
  date: Date;
  data: any;
  valor: any;
  dpi: string;
  rol: string;
  correo: any;
  dataSource: any;
  Opciones: any = [];
  userData: any[] = [];
  puntos: any;
  siglas: any;
  correlativo: any;
  infoPuntos: any;
  tiposquejass: any;
  // puntosAtencion: Opciones[];
  regionPuntosAtencion: any[];
  PuntosAtencion: any[];
  mediosIngresoLista: any[];
  TiposQuejas: Opciones[];
  fileToUpload: File = null;
  cantidadQuejas: number;
  // tslint:disable-next-line: ban-types
  Medios = [
    { value: 20, viewValue: ' Teléfono' },
    { value: 21, viewValue: ' Correo' },
    { value: 22, viewValue: ' Chat' },
    { value: 23, viewValue: ' Presencial' },
    { value: 24, viewValue: ' Aplicación móvil' },
    { value: 25, viewValue: ' Portal' }
  ];

  // displayedColumns: string[] = ['nombrePuntoAtencion', 'usuario', 'correo', 'cargo', 'estadoUsuario','accion'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(LoginComponent) logincomponent: LoginComponent;
  constructor(private authService: AuthService,
              private IngresoQuejaporUsuarioService: IngresoQuejaPorUsuarioService,
              private envioCorreoService: EnvioCorreoService,
              private router: Router,
              // tslint:disable-next-line:variable-name
              private _formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe) {

    // controladores para crear una queja
    this.CrearQuejaGroup = this._formBuilder.group({
      MedioIngresoControl: new FormControl('', Validators.required),
      NombreControl: new FormControl('', Validators.required),
      correoControl: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      Validators.required, ]),
      TelefonoControl: new FormControl('', Validators.required),
      OficinaControl: new FormControl(''),
      NombreEmpleadoControl: new FormControl(''),
      DetalleQuejaControl: new FormControl('', Validators.required),
      estadoPuntoAtencionControl: new FormControl(''),
      regionControl: new FormControl(''),
      detalleControl: new FormControl('', Validators.required)
    });
    this.date = new Date();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async res => {
      if (res.has('dpi')) {
        this.dpi = res.get('dpi');
      }
      if (res.has('rol')) {
        this.rol = res.get('rol');
      }
    });
    this.tiposQuejas();
    this.puntosAtencion();
    this.MediosIngresoDeQueja();
    this.obtenerCorrelativo();
    this.CrearQuejaGroup.get('DetalleQuejaControl').setValue(1);

  }

  // Metodo para volver al menu principal
  menuPrincipal(): void {
    console.log(this.rol, ' ', this.dpi);
    this.router.navigate(['menu-principal/', this.rol, this.dpi]);
  }

  // tslint:disable-next-line:typedef
  opcionSeleccionada(event) {
    console.log('el medio es', this.CrearQuejaGroup.get('MedioIngresoControl').value);
  }

  // tslint:disable-next-line:typedef
  puntosAtencion() {
    this.IngresoQuejaporUsuarioService.getPuntosAtencion().subscribe(res => {
    console.log('res es', res);
    this.puntos = this.CrearQuejaGroup.get('OficinaControl').value;
    // tslint:disable-next-line: prefer-const
    for (let i in res){
      if (res[i].codigo_punto_atencion === this.puntos){
        this.infoPuntos = res[i];

      }
    }
    this.PuntosAtencion = res;
    // console.log("id del punto seleccionado: ", this.CrearQuejaGroup.get('OficinaControl').value);
    // console.log("region del punto seleccionado", this.infoPuntos.codigo_region);
    }, err => {
      console.log(err);

    }
    );
  }
  // tslint:disable-next-line:typedef
  tiposQuejas(){
    this.IngresoQuejaporUsuarioService.getTiposQuejas().subscribe(res => {
     // console.log("quejas son", res);
      this.TiposQuejas = res;
     // console.log("id queja", this.CrearQuejaGroup.get('DetalleQuejaControl').value);
      this.valor = this.CrearQuejaGroup.get('DetalleQuejaControl').value - 1;
      this.siglas = res[this.valor].siglas;
     // console.log("datos queja", this.siglas);
      }, err => {
        console.log(err);
      }
      );
  }
  // tslint:disable-next-line:typedef
  MediosIngresoDeQueja(): void{
    this.IngresoQuejaporUsuarioService.MediosIngresoDeQueja().subscribe(res => {
      console.log('medios ingreso', res);
      this.mediosIngresoLista = res;
      }, err => {
        console.log(err);
      });
  }

  // Metodo para obtener el correlativo
  obtenerCorrelativo(): void{
    this.IngresoQuejaporUsuarioService.correlativo().subscribe(res => {
      console.log('el correlativo es:', res[0]);
    }, err => {
      console.log(err);
    });
  }
  // tslint:disable-next-line:typedef
  guardaQueja(enviarQueja) {
    // tslint:disable-next-line: quotemark
    this.IngresoQuejaporUsuarioService.getAllTiposQuejas().subscribe(res => {
      this.cantidadQuejas = (res.length + 1);
      // tslint:disable-next-line: quotemark
      this.correlativo = this.siglas + '-' + this.cantidadQuejas + '-' + this.datePipe.transform(this.date, "yyyy");
    }, err => {
      console.error(err);
    });
    const Queja = {
      codigo_queja: 0,
      codigo_etapa: 7, // analisis
      codigo_tipo_creador: 26, // cliente, 27 contribuyente
      codigo_region_evento: this.infoPuntos.codigo_region,
      codigo_medio_ingreso: this.CrearQuejaGroup.get('MedioIngresoControl').value,
      codigo_estado_externo: 28, // presentada
      codigo_estado_interno: 29, // presentada
      codigo_tipo_queja: this.CrearQuejaGroup.get('DetalleQuejaControl').value, // this.CrearQuejaGroup.get('regionesControl').value
      codigo_punto_atencion: this.CrearQuejaGroup.get('OficinaControl').value,
      dpi_usuario: this.dpi,
      nombre: enviarQueja.NombreControl,
      correo_electronico: enviarQueja.correoControl,
      nombre_empleado: enviarQueja.NombreEmpleadoControl,
      detalle_queja: this.CrearQuejaGroup.get('detalleControl').value,
      // tslint:disable-next-line: quotemark
      fecha_creacion: this.datePipe.transform(this.date, "yyyy-MM-dd"),
      fecha_modificacion: null,
      // tslint:disable-next-line: quotemark
      hora_ingreso: this.datePipe.transform(this.date, "HH:mm"),
      correlativo: this.correlativo, /* (this.tiposquejass.siglas + "-"
      + this.codigo_queja + "-" + this.datePipe.transform(this.date, "yyyy")),*/
      documento_soporte: null
    };
    console.log('datos a enviar', Queja);
    this.IngresoQuejaporUsuarioService.InsertQuejas(Queja).subscribe(res => {
      this.correo = this.CrearQuejaGroup.get('correoControl').value;
      this.enviarCorreo();
      this.abrirmodal();
    }, err => {
      console.error(err);
    });
  }
  // tslint:disable-next-line:typedef
  public abrirmodal() {
    $('#confirmacionDeEnvio').modal('show');
  }
  limpiarDatos(): void {
    this.CrearQuejaGroup.reset();
  }
  // tslint:disable-next-line:typedef
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  // Metodo para enviar correo
  enviarCorreo(): void{
    const datosCorreo = {
      paraCorreo: this.correo,
      asuntoCorreo: 'Notificación de creación de queja',
      cuerpoCorreo: 'Señor cuentahabiente,  agradecemos su comunicación, ' +
                    'le informamos que su queja ha sido recibida exitosamente. ' +
                    'Para el seguimiento o cualquier consulta relacionada, no olvide que el número de su queja es ' + this.correlativo
    };
    console.log('los datosCorreo son ', datosCorreo);
    this.envioCorreoService.enviarCorreo(datosCorreo).subscribe(res => {
      console.log('la respuesta de enivar correo es ', res);
    });
  }

}

interface Opciones {
  value: number;
  viewValue: string;
}
