import { paciente } from './paciente.model';
import { alergia } from './alergia.model';
import { tipoSangre } from './tiposSangre.model';

export class expediente {
    constructor(
        public paciente: paciente,
        public alergia: alergia,
        public tipoSangre: tipoSangre,
    ) { }
}