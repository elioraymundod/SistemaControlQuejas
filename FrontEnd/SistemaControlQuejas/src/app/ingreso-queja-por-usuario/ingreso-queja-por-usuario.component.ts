import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { PuntosAtencnionService } from '../Services/puntosAtencion.service';
import { UsuariosPuntosdeAtencionService } from '../Services/UsuariosPuntosdeAtencion.service';
declare let $: any;


@Component({
  selector: 'app-ingreso-queja-por-usuario',
  templateUrl: './ingreso-queja-por-usuario.component.html',
  styleUrls: ['./ingreso-queja-por-usuario.component.css']
})
export class IngresoQuejaPorUsuarioComponent implements OnInit {
  CrearQuejaGroup: FormGroup;
  date: Date;
  Opciones: any=[];

  //displayedColumns: string[] = ['nombrePuntoAtencion', 'usuario', 'correo', 'cargo', 'estadoUsuario','accion'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private UsuariosPuntosdeAtencionService: UsuariosPuntosdeAtencionService,
    private puntosAtencionService: PuntosAtencnionService,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe) {
      //controladores para crear una queja
      this.CrearQuejaGroup = this._formBuilder.group({  
        MedioIngresoControl: new FormControl('', Validators.required),
        NombreControl: new FormControl('', Validators.required),
        correoControl: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),Validators.required,]),
        TelefonoControl: new FormControl('', Validators.required),
        OficinaControl: new FormControl(''),
        NombreEmpleadoControl: new FormControl(''),
        DetalleQuejaControl: new FormControl('',Validators.required)
  
      });
    this.date = new Date();
     }

  ngOnInit(): void {
   
  }
  

  opcionSeleccionada(event){
    console.log(this.CrearQuejaGroup.get('MedioIngresoControl').value);
   
    
  }

  
  public abrirmodal() {
    $('#confirmacionDeEnvio').modal('show');
  }

  Medios = [
    {value: 20, viewValue: ' Teléfono'},
    {value: 21, viewValue: ' Correo'},
    {value: 22, viewValue: ' Chat'},
    {value: 23, viewValue: ' Presencial'},
    {value: 24, viewValue: ' Aplicación móvil'},
    {value: 25, viewValue: ' Portal'}

  ];

}

