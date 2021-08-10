import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config.http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  api = URL_SERVICIOS;
  // header = URL_HEADER;
 
  constructor(
    private http: HttpClient
  ) { }

  SaveOrUpdateParte(documento) {
    return this.http.post<any>(this.api + `/parte/saveOrUpdateParte`, JSON.stringify(documento), {headers :new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('usertoken') }  )} );
  }
  public getListaParte(palabra): Observable<any[]> {
    return this.http.get<any[]>(this.api + `/incidencia/getIncidenciaByLike?desc=${palabra}`, {headers :new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('usertoken') }  )} );
  }
  public getInicidenciaxParte(parte): Observable<any[]> {
    return this.http.get<any[]>(this.api + `/parte/getParteByNroParte?nroparte=${parte}`, {headers :new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('usertoken') }  )} );
  }
  
  public getChartIncidencias(finicio ='2020-06-01', ffin='2020-06-12'): Observable<any[]> {
    return this.http.get<any[]>(this.api + `/parte/getReportByFechas?finicio=${finicio}&ffin=${ffin}`, {headers :new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('usertoken') }  )} );
  }
  
  // CRUD INCIDENCIAS
  
  public getListaIncidencias(): Observable<any[]> {
    return this.http.get<any[]>(this.api + `/incidencia/getFindAllIncidencia`, {headers :new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('usertoken') }  )} );
  }
  
  SaveOrUpdateIncidencias(incidencia) {
    return this.http.post<any>(this.api + `/incidencia/saveOrUpdateIncidencia`, JSON.stringify(incidencia), {headers :new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('usertoken') }  )} );
  }
  public deleteIncidencia(id: number): void {
    this.http.post(this.api + '/incidencia/deletIncidencia', JSON.stringify(id), { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('usertoken') }) }).subscribe();
  }
}
