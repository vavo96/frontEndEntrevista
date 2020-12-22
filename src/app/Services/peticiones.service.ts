import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { paciente } from '../Models/paciente.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { alergia } from '../Models/alergia.model';
import { tipoSangre } from '../Models/tiposSangre.model';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(
    private http: HttpClient) { }

  agregarPaciente(formData: paciente): Observable<unknown> {

    return this.http.post(`${base_url}/pasientes`, formData).pipe(
      map((resp: any) => {
        return resp.msg;
      }),
      catchError(this.manejoError)
    );
  }

  getPacientes(): Observable<unknown> {

    return this.http.get(`${base_url}/pasientes`).pipe(
      map((resp: any) => {
        return resp.pacientes;
      }),
      catchError(this.manejoError)
    );
  }


  getAlergias(): Observable<alergia> {

    return this.http.get(`${base_url}/alergias`).pipe(
      map((resp: any) => {
        return resp.alergias;
      }),
      catchError(this.manejoError)
    );
  }


  getTiposDeSangre(): Observable<tipoSangre> {

    return this.http.get(`${base_url}/tiposDeSangre`).pipe(
      map((resp: any) => {
        return resp.tiposDeSangre;
      }),
      catchError(this.manejoError)
    );
  }

  findPaciente(expediente: string): Observable<unknown> {

    return this.http.post(`${base_url}/busqueda`, { id: expediente }).pipe(
      map((resp: any) => {
        return resp.paciente;
      }),
      catchError(this.manejoError)
    );
  }

  manejoError(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 400:
        if(error.error.errors){
          const errores = Object.keys(error.error.errors);
          Swal.fire('Error', error.error.errors[errores[0]].msg, 'error');
        } else {
          Swal.fire('Error', error.error.msg, 'error');
        }
        break;
      case 401:
        Swal.fire('Error', 'Esta accediendo sin autenticarse', 'error');
        break;
      case 404:
        Swal.fire('Error', error.error.msg, 'error');
        break;
      default:
        break;
    }
    return throwError('error inesperado');
  }
}
