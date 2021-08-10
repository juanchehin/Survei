import { Component, OnInit } from '@angular/core';
import { IncidenciasService } from 'src/app/service/incidencias.service';
import { ParteModel } from '../../../model/incidencia.model';
import { Router } from '@angular/router';
import { PersonaModel } from '../../../model/persona.model';
declare var swal: any;
@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.scss']
})
export class IncidenciaComponent implements OnInit {
  imagen = './assets/img/pat1.jpg' || "surveillance/assets/img/pat1.jpg";
  parte: ParteModel
  save = 'GUARDAR'
  editParte: ParteModel;
  // hoy = new Date();
  selectedhabilidades: string[] = [];
  incidencias: { idincidencia: number; descripcion: string; }[] = [];
  asuntoDesc = '';
  verhoras = true;
  hora = '';
  fecha = '';
  contenido = '';
  // fregis = new Date()
  persona = new PersonaModel();
  verFecha = false;
  sectores = [
    {value: 'I', label: 'SECTOR I'},
    {value: 'II', label: 'SECTOR II'},
    {value: 'III', label: 'SECTOR III'},
  ]
  constructor(
    private _incidenciaSrv: IncidenciasService,
    private _router: Router
  ) {
    this.parte = new ParteModel();
    if (localStorage.getItem('construir') !== null) {
      this.persona = JSON.parse(localStorage.getItem('construir')).idpersona;
      this.verhoras = false;
      this.save = 'ACTUALIZAR'
      this.editParte = JSON.parse(localStorage.getItem('construir'));
      this.parte.contenido = this.contenido = this.editParte.contenido;
      this.parte.fregistro = this.editParte.fregistro;
      this.fecha = this.editParte.fregistro;
      this.hora = ' ';
      this.parte.idparte = this.editParte.idparte; //<---------------------
      this.parte.nroparte = this.editParte.nroparte; //<---------------------
      this.parte.receptor = this.editParte.receptor;
      this.parte.referencia = this.editParte.referencia;
      this.parte.sector = this.editParte.sector;
      this.parte.turno = this.editParte.turno;
      this.parte.idpersona = this.editParte.idpersona.idpersona;
      this.parte.incidencia = this.editParte.incidencia.idincidencia;
      this.asuntoDesc = this.editParte.incidencia.descripcion;
      this.verFecha = true;
    } else {
      console.log('entro');
      this.contenido = '';
      this.editParte = new ParteModel();
      this.parte = new ParteModel();
      this.persona = JSON.parse(localStorage.getItem('personal'));
      this.parte.idpersona = this.persona.idpersona;
    }
  }

  ngOnInit() {



  }

  onSelectionChange(){
    
  }
  buscar(e: KeyboardEvent, basicModal1) {
    const value = e.target['value']
    if (e.keyCode !== 8) {
      // console.log(e.keyCode);
      if (value.length > 4) {
        this._incidenciaSrv.getListaParte(value).subscribe((res: any) => {
          if (res.code === 204) {
             swal('INFORME!', 'INCIDENCIA NO ENCONTRADA', 'warning');
            basicModal1.hide();
          } else if (res.code === 200) {
            basicModal1.show();
            this.incidencias = res.data;
          }
        })
      }

    }
  }
  guardarParte(basicModal) {
    console.log( this.fecha);
    
    this.parte.fregistro = this.fecha;
    basicModal.show();
    if (!this.hora) {
      swal('MAL!', 'FALTA HORA DE LOS HECHOS', 'warning');
      basicModal.hide();
    }
    if (!this.fecha) {
      swal('MAL!', 'FALTA FECHA DE LOS HECHOS', 'warning');
      basicModal.hide();
    }
    this.parte.contenido = 'Siendo las ' + this.hora + ' horas del día ' + this.fecha.substr(0, 10) + ' ' + this.contenido
    this.parte.fregistro = this.fecha;
    // this.parte.nroparte = 1;
    if (!this.parte.referencia) {
      swal('MAL!', 'FALTA REFERENCIA', 'warning');
      basicModal.hide();
    }
    if (!this.parte.receptor) {
      swal('MAL!', 'FALTA RECEPTOR', 'warning');
      basicModal.hide();
    }
    if (!this.parte.sector) {
      swal('MAL!', 'FALTA SECTOR', 'warning');
      basicModal.hide();
    }
    if (!this.parte.turno) {
      swal('MAL!', 'FALTA TURNO', 'warning');
      basicModal.hide();
    }
    if (this.parte.contenido.length <= 50) {
      swal('MAL!', 'FALTA DESCRIBIR CONTENIDO', 'warning');
      basicModal.hide();
    }
    if (!this.parte.incidencia) {
      swal('MAL!', 'FALTA SELECCIONAR INCIDENCIA', 'warning');
      basicModal.hide();
    }
  }
  chenckboxIncidencias(event, basicModal1) {
    this.parte.incidencia = event.idincidencia;
    this.asuntoDesc = event.descripcion;
    basicModal1.hide();

  }
  asuntoAdd() {
    this.asuntoDesc = this.selectedhabilidades.toString();
  }
  SabeOrUpdateParte(basicModal) {
    console.log(this.parte);

    this._incidenciaSrv.SaveOrUpdateParte(this.parte).subscribe((res: any) => {
      console.log(res);
      if (res.code === 200) {
        swal({
          title: "GUARDADO!",
          text: "DATOS GUARDADOS CORRECTAMENTE!",
          icon: "success",
          button: "OK!",
        });
        basicModal.hide();
        localStorage.setItem('parte', JSON.stringify(res.data));
        this._router.navigate(['/AAC/Incidencia/Pdf']);
      } else if(res.code === 502){
         swal('AVISO!', 'EL NUMERO DE PARTE YA EXISTE', 'warning');
      }
    })
  }
  ngOnDestroy(): void {
    localStorage.removeItem('construir');
  }

}
