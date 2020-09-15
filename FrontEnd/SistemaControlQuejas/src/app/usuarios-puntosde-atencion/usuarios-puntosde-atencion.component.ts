import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsuariosPuntosdeAtencionService } from '../Services/UsuariosPuntosdeAtencion.service';
@Component({
  selector: 'app-usuarios-puntosde-atencion',
  templateUrl: './usuarios-puntosde-atencion.component.html',
  styleUrls: ['./usuarios-puntosde-atencion.component.css']
})

export class UsuariosPuntosdeAtencionComponent implements OnInit {
  displayedColumns: string[] = ['region', 'nombrePuntoAtencion','usuario','correo','cargo', 'estadoUsuario', 'accion'];
  dataSource: any;
  UsuariosPuntosdeAtencion: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private UsuariosPuntosdeAtencionService:UsuariosPuntosdeAtencionService ) { }

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
}

