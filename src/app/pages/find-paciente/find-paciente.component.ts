import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeticionesService } from '../../Services/peticiones.service';
import { expediente } from '../../Models/expediente.model';

@Component({
  selector: 'app-find-paciente',
  templateUrl: './find-paciente.component.html',
  styleUrls: ['./find-paciente.component.scss']
})
export class FindPacienteComponent implements OnInit {

  public formSearch: FormGroup;
  public expediente: any;

  constructor(
    private creadorForms: FormBuilder,
    private peticiones: PeticionesService
  ) {
    this.formSearch = this.creadorForms.group({
      id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  searchExpediente(): void {
    this.peticiones.findPaciente(this.formSearch.value.id).subscribe((resp: expediente) => {
      console.log(resp);
      this.expediente = resp;
    });
  }

  getFecha(fecha): any {
    const date = new Date(fecha);
    return date.toLocaleString();
  }

  limpiar(): void{
    this.expediente = null;
    this.formSearch.reset();
  }
}
