import { Component, OnInit } from '@angular/core';
import { ParteModel } from 'src/app/model/incidencia.model';
import { PersonaModel } from '../../../model/persona.model';

@Component({
  selector: 'app-print-inicidencia',
  templateUrl: './print-inicidencia.component.html',
  styleUrls: ['./print-inicidencia.component.scss']
})
export class PrintInicidenciaComponent implements OnInit { 
  imagen = './assets/img/pat1.jpg' || "surveillance/assets/img/pat1.jpg";
  hoy = new Date();
  parte = new ParteModel();
  persona = new PersonaModel();
  constructor() {
    if (localStorage.getItem('construir') !== null) {     
      this.persona = JSON.parse(localStorage.getItem('construir')).idpersona;   
    } else {      
      this.persona = JSON.parse(localStorage.getItem('personal'));      
    }
   }
  ngOnInit() {
    this.parte = JSON.parse(localStorage.getItem('parte'));
  }
  createPDF() {
    var sTable = document.getElementById('imprimirpfg').innerHTML;
    var style = "<style>";
    style = style + "div.pageA4 {font-family: Tahoma, Geneva, Verdana, sans-serif; width: 210mm; height: 245mm;}";
    style = style + "p { font-size: 2vw; }";
    style = style + ".cabezera { background-image: url('./assets/img/pat1.jpg')!important; height: 150px;}";
    // style = style + ".raya {text-decoration: underline; }";
    style = style + ".fuerte { font-weight: 700; }";
    style = style + ".izquierda {  margin-left: 8vw; }";
    style = style + ".cuerpo {text-align: justify;}";
    style = style + ".centro { font-size: 10px; display: grid;  grid-template-columns: repeat(3, 1fr); grid-auto-rows: 200px; text-align: center; grid-template-areas: 'a  b  c' 'd  e  f'}";
    style = style + ".firma { grid-area: b;  border-bottom: 2px solid black;}";
    style = style + ".nombrs { grid-area: e; font-size: 11px; margin:0; padding:0;}";
    style = style + "</style>";
    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head>');
    win.document.write('<title>imprimir</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');
    win.document.close(); 	// CLOSE THE CURRENT WINDOW.
    win.print();    // PRINT THE CONTENTS.
  }
  ngOnDestroy(): void {
    localStorage.removeItem('parte');
  }

}
