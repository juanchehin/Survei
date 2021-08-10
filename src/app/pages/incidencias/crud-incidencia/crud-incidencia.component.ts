import { Component, OnInit } from '@angular/core';
import { IncidenciasService } from '../../../service/incidencias.service';
import { IncidenciaModel } from 'src/app/model/incidencia.model';
declare var swal:any;
@Component({
  selector: 'app-crud-incidencia',
  templateUrl: './crud-incidencia.component.html',
  styleUrls: ['./crud-incidencia.component.scss']
})
export class CrudIncidenciaComponent implements OnInit {
  newIncidencia = new IncidenciaModel();
  titulo = 'NUEVA INCIDENCIA'
  term = '';
  p: number = 1;
  ListarIndicencias = new Array<IncidenciaModel>();
  constructor(
    private _incidenciaSrv: IncidenciasService
  ) { }

  ngOnInit() {
    this.listallIncidencia();
  }
  listallIncidencia(){
    this._incidenciaSrv.getListaIncidencias().subscribe((res:any)=> {
      this.ListarIndicencias = res.data;
      // console.log(this.ListarIndicencias);
    })
  }

  guardarAndEditar(basicModal){
    this.newIncidencia.descripcion = this.newIncidencia.descripcion.toUpperCase();
    this._incidenciaSrv.SaveOrUpdateIncidencias(this.newIncidencia).subscribe((res)=> {
      console.log(res);
      if(res.code === 200){
        this.ListarIndicencias.push(res.data);
         swal('BIEN!', 'INCIDENCIA GUARDADO CORRECTAMENTE!', 'success');
         basicModal.hide()
      }      
    })
  }
  editarInicidencia(item, basicModal){
    console.log(item);
    this.newIncidencia = item;
    this.titulo = 'EDITAR INCIDENCIA'
    basicModal.show()
  }
  eliminarIncidencia(item){
    if (confirm('¿Está seguro que desea eliminar la incidencia?')) {
      this._incidenciaSrv.deleteIncidencia(item.idincidencia);
      swal('ELIMINADO!', 'INCIDENCIA ELIMINADA!');
      this.ListarIndicencias = this.ListarIndicencias.filter(u => item.idincidencia !== u.idincidencia);
    }
    
  }
}
