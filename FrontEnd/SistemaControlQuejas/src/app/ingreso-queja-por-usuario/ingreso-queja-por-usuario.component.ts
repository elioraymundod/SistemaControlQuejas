import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { PuntosAtencnionService } from '../Services/puntosAtencion.service';
import { UsuariosPuntosdeAtencionService } from '../Services/UsuariosPuntosdeAtencion.service';
import Swal from 'sweetalert2';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IngresoQuejaPorUsuarioService } from '../Services/IngresoQuejaPorUsuario.service';
import { LoginComponent } from '../login/login.component';
declare let $: any;


@Component({
  selector: 'app-ingreso-queja-por-usuario',
  templateUrl: './ingreso-queja-por-usuario.component.html',
  styleUrls: ['./ingreso-queja-por-usuario.component.css']
})
export class IngresoQuejaPorUsuarioComponent implements OnInit {
  CrearQuejaGroup: FormGroup;
  date: Date;
  data: any;
  dpi: string;
  dataSource: any;
  Opciones: any = [];
  userData: any[] = [];
  puntos: any;
  fileToUpload: File = null;
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
    });
    this.date = new Date();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async res => {
      if (res.has('dpi')) {
        this.dpi = res.get('dpi');
      }
    });
    this.puntosAtencion();

  }

  // tslint:disable-next-line:typedef
  opcionSeleccionada(event) {
    console.log(this.CrearQuejaGroup.get('MedioIngresoControl').value);
  }

  // tslint:disable-next-line:typedef
  puntosAtencion() {
    this.IngresoQuejaporUsuarioService.getPuntosAtencion().subscribe(res => {
      this.puntos = res;
      console.log("res es", res);
      this.CrearQuejaGroup.get('OficinaControl');

    }, err => {
      console.log(err);

    }
    );


  }

  // tslint:disable-next-line:typedef
  guardaQueja() {

  }


  /*
  const Queja = {
    codigo_queja: 0,
    codigo_etapa: 7,//analisis
    codigo_tipo_creador: 26,//cliente, 27 contribuyente
    codigo_region_evento: 0,
    codigo_medio_ingreso: data.MedioIngresoControl,
    codigo_estado_externo: 28,//presentada
    codigo_estado_interno: 29,//presentada
    codigo_tipo_queja: 0,
    codigo_punto_atencion:0,
    dpi_usuario:0,
    nombre: data.NombreControl,
    correo_electronico: data.correoControl,
    nombre_empleado: data.NombreEmpleadoControl,
    detalle_queja: data.DetalleQuejaControl,
    fecha_creacion:this.datePipe.transform(this.date, "yyyy-MM-dd"),
    hora_ingreso:'yyyy-MM-dd HH:mm:ss Z',
    correlativo:0,
    documento_soporte:''
  }*/

  // tslint:disable-next-line:typedef
  public abrirmodal() {
    $('#confirmacionDeEnvio').modal('show');
  }
  // tslint:disable-next-line:typedef
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}

