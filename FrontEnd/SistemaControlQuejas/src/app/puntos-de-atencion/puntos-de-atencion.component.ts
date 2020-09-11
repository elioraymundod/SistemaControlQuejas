import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PuntosAtencnionService } from '../Services/puntosAtencion.service';

@Component({
  selector: 'app-puntos-de-atencion',
  templateUrl: './puntos-de-atencion.component.html',
  styleUrls: ['./puntos-de-atencion.component.css']
})
export class PuntosDeAtencionComponent implements OnInit {
  displayedColumns: string[] = ['region', 'nombrePuntoAtencion', 'estadoPuntoAtencion', 'accion'];
  dataSource: any;
  puntosAtencion: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private puntosAtencionService: PuntosAtencnionService) { }

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

  ejemplo() {
    console.log('Hola vanish');
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

