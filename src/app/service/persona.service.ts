import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config.http';
import { Observable } from 'rxjs';
import { PersonaModel } from '../model/persona.model';



@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  api = URL_SERVICIOS;

header2 = new HttpHeaders({'content-type': 'application/json'});

  constructor(
    private http: HttpClient
  ) { }

  SaveOrUpdatePersona(persona) {
    return this.http.post<any>(this.api + `/empleado/saveOrUpdateEmpleado`, JSON.stringify(persona) , {headers :new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('usertoken') }  )} );
  }
  public getListarPersona(): Observable<PersonaModel[]> {
    return this.http.get<PersonaModel[]>(this.api + `/empleado/getAllEmpleado`, {headers :new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('usertoken') }  )} );
  }
  public getListarrol(): Observable<any[]> {
    return this.http.get<any[]>(this.api + `/empleado/getAllRol`, {headers :new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('usertoken') }  )} );
  }
  
  SaveOrUpdateUsuario(usuario) {
    console.log(usuario);
    
    // return this.http.post<any>(this.api + `/auth/signup`, JSON.stringify(usuario),{ headers: {headers :new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('usertoken') }  )} });
    return this.http.post<any>(this.api + `/auth/signup`, JSON.stringify(usuario),{ headers:new HttpHeaders({'content-type': 'application/json'}) });
  }


}
