import { Component, OnInit, ViewChild } from '@angular/core';
import { expediente } from '../../Models/expediente.model';
import { PeticionesService } from '../../Services/peticiones.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-pacientes',
  templateUrl: './list-pacientes.component.html',
  styleUrls: ['./list-pacientes.component.scss']
})
export class ListPacientesComponent implements OnInit {
  public expedientes: Array<expediente>;
  public dataSource: MatTableDataSource<expediente>;
  public displayedColumns: string[] = [
    'expediente',
    'fecha_creacion',
    'nombre',
    'tipo_sangre',
    'alergia',
    'medicamento',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private peticiones: PeticionesService) {
    this.expedientes = new Array();
  }

  ngOnInit(): void {
    this.peticiones.getPacientes().subscribe(<expediente>(resp) => {
      this.expedientes = [...resp];
      console.log(this.expedientes)
      this.dataSource = new MatTableDataSource(this.expedientes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
