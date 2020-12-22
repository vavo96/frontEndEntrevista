import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tipoSangre } from '../../Models/tiposSangre.model';
import { alergia } from '../../Models/alergia.model';
import { paciente } from '../../Models/paciente.model';
import { PeticionesService } from '../../Services/peticiones.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-paciente',
  templateUrl: './create-paciente.component.html',
  styleUrls: ['./create-paciente.component.scss']
})
export class CreatePacienteComponent implements OnInit {

  public formPaciente: FormGroup;
  public tiposDeSangre: Array<tipoSangre>;
  public alergias: Array<alergia>;
  constructor(
    private createForms: FormBuilder,
    private peticiones: PeticionesService,
    private router: Router
  ) {
    this.formPaciente = this.createForms.group({
      id: ['', Validators.compose([Validators.required])],
      nombre: ['', Validators.compose([Validators.required])],
      alergiaId: ['', Validators.compose([Validators.required])],
      tiposSangreId: ['', Validators.compose([Validators.required])],
    });
    this.alergias = new Array();
    this.tiposDeSangre = new Array();
  }

  ngOnInit(): void {
    this.peticiones.getAlergias().subscribe(<alergia> (resp) => {
      this.alergias = [...resp];
    });
    this.peticiones.getTiposDeSangre().subscribe(<tipoSangre> (resp) => {
      this.tiposDeSangre = [...resp];
    });
  }

  guardarPaciente(): void{
    this.peticiones.agregarPaciente(this.formPaciente.value).subscribe(resp => {
      Swal.fire('Exito', `${resp}`, 'success');
      this.formPaciente.reset();
    }
    );
  }

  cancelar(): void {
    this.router.navigate(['listPacientes']);
  }
}
