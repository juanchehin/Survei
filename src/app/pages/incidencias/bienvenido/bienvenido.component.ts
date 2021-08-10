import { Component, OnInit } from '@angular/core';
import { IncidenciasService } from 'src/app/service/incidencias.service';
import { ParteModel } from '../../../model/incidencia.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent implements OnInit {
  imagen = './assets/img/logo.jpg' || 'surveillance/assets/img/logo.jpg';
  nParte='';
  verInfo = false;
  bParte:ParteModel;
  constructor(
    private _IncidenicaSrv: IncidenciasService,
    private _router: Router
  ) { 
    this.bParte = new ParteModel();
  }

  ngOnInit() {
  }
  buscarParte() {
    this._IncidenicaSrv.getInicidenciaxParte(this.nParte).subscribe((res:any)=>{
      console.log(res);
      if(res.code === 200){
        this.verInfo = true;
        this.bParte = res.data;
      } else if(res.code === 204){
        this.bParte = new ParteModel();
        this.verInfo = false;
      }
    })
  }
  construir() {
    localStorage.setItem('construir', JSON.stringify(this.bParte));
    this._router.navigate(['/AAC/Incidencia/Incidencia'])
  }
}
