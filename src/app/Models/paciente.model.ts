
export class paciente {
    constructor(
        public id: string,
        public nombre: string,
        public tiposSangreId: number,
        public alergiaId: number,
        public created_at: any,
        public update_at: any
    ) { }
}