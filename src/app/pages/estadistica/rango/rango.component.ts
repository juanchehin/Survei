import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'ng-uikit-pro-standard';
import { IncidenciasService } from 'src/app/service/incidencias.service';
import * as XLSX from 'xlsx';
import { ReporteModel } from 'src/app/model/incidencia.model';

@Component({
  selector: 'app-rango',
  templateUrl: './rango.component.html',
  styleUrls: ['./rango.component.scss']
})
export class RangoComponent implements OnInit {
  sectores1 = [0];
  sectores2 = [0];
  sectores3 = [0];
  labeles = [''];
  public chartType: string = 'bar';
  finicio = new Date().toISOString().substr(0, 8) + '01';
  ffin = new Date().toISOString().substr(0, 10);
  listar: any = [
    { data: 2, result: 'Pastel' },
    { data: 2, result: 'Dona' },
  ];

  listaSector = [
    { incidencia: 'ACCIDENTE DE TRANSITO VEHICULAR', sector1: 2, sector2: 3, sector3: 6 }
  ]




  tiposgraficas = [
    { id: 1, descripcion: 'Pastel', tipo: 'pie' },
    { id: 2, descripcion: 'Dona', tipo: 'doughnut' },
    { id: 3, descripcion: 'Barras', tipo: 'bar' },
    { id: 4, descripcion: 'Barras horizontal', tipo: 'horizontalBar' },
    { id: 5, descripcion: 'Polar', tipo: 'polarArea' },
    { id: 6, descripcion: 'Lineal', tipo: 'line' }

  ];
  public chartDatasets: Array<any> = [
    { data: [], label: 'Hola1' }
  ];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    // {
    //   backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#CC0000', '#FF8800', '#007E33', '#33b5e5', '#00695c', '#0d47a1', '#9933CC', '#212121', '#3E4551', '#1C2331', '#263238'],
    //   hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#ff4444', '#ffbb33', '#00C851', '#0099CC', '#2BBBAD', '#4285F4', '#aa66cc', '#2E2E2E', '#4B515D', '#3F729B', '#37474F'],
    //   borderColor: 'rgba(0, 10, 130, .7)',
    //   borderWidth: 2,
    // }
    {
      backgroundColor: '#F7464A',
      borderColor: '#FF5A5E',
      borderWidth: 2,
    },
    {
      backgroundColor: '#46BFBD',
      borderColor: '#5AD3D1',
      borderWidth: 2,
    },
    {
      backgroundColor: '#FDB45C',
      borderColor: '#FFC870',
      borderWidth: 2,
    },
  ];

  public chartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };
  public chartClicked(e: any): void {
    console.log(e);

  }
  public chartHovered(e: any): void {
    // console.log(e);

  }
  selectincidencias(e) {
    console.log(e);
    this.chartType = e;
  }
  constructor(
    private _incidenciaSrv: IncidenciasService
  ) {
  }
  ngOnInit() {

    this._incidenciaSrv.getChartIncidencias(this.finicio, this.ffin).subscribe((res: any) => {
      // console.log(res);
      if (res.code === 200) {
        this.chartDatasets = [{ data: res.data }]
        this.chartLabels = res.result;

        this.listar = this.fusionar(res.cantidad, res.incidencia, res.sector)
        // this.listar.data = Object.assign({}, res.data);
        // this.listar.result = Object.assign({}, res.result);
        // console.log(this.listar);
      }

    })
  }
  graficar() {
    const inicio = this.finicio.substr(0, 10);
    const fin = this.ffin.substr(0, 10);
    this._incidenciaSrv.getChartIncidencias(inicio, fin).subscribe((res: any) => {
      console.log(res);
      if (res.code === 200) {
        // this.chartDatasets = [{ data: res.data }]
        // this.chartLabels = res.result;
        this.listar = this.fusionar(res.cantidad, res.incidencia, res.sector)
      } else if (res.code == 204) {
        this.chartDatasets = [{ data: [] }]
        this.chartLabels = [];
      }
    })
  }
  fusionar(cantidad, incidencia, sector) {
    // console.log(cantidad);
    
    // var salida = [{ data: null, result: null }]
    var restar = 0;
    var salida = [{ incidencia: null, sector1: null, sector2: null, sector3: null }]
    var j = 0;
    var dobblea= true;
    // var tripple= true;
    for (let i = 0; i < cantidad.length; i++) {
      j = salida.length -1;
      var sect = sector[i];     
      if(i === 0) { 
      if (sect === 'I') {
        salida[0].incidencia = incidencia[0];
        salida[0].sector1 = cantidad[0];
        salida[0].sector2 = 0;
        salida[0].sector3 = 0;
        console.log('entro');
      }
       if (sect === 'II') {
        salida[0].incidencia = incidencia[0];
        salida[0].sector1 = 0;
        salida[0].sector2 = cantidad[0];
        salida[0].sector3 = 0;        
      } 
      if (sect === 'III') {
        salida[0].incidencia = incidencia[0];
        salida[0].sector1 = 0;
        salida[0].sector2 = 0;
        salida[0].sector3 = cantidad[0];
      } }
      if (i !== 0) {
        if(incidencia[j] === incidencia[i]){        
          if (sect === 'II' && dobblea === true) {                    
            salida[j].sector2 = cantidad[i];                
            dobblea = false;
          } else if(dobblea === true)  {
            salida[j].sector2 = 0;
            dobblea = false;
          }
          if (sect === 'III') {            
            salida[j].sector3 = cantidad[i];
           } //else if(tripple === true) {
          //   // tripple = false;
          //   salida[j].sector3 = 100;
          //   i++;
          // }
        } else {
          dobblea = true;
          // tripple = true;
           j++;
          var subida = { incidencia: null, sector1: null, sector2: null, sector3: null }
          if (sect === 'I') {
            subida.incidencia = incidencia[i];
            subida.sector1 = cantidad[i];
            subida.sector2 = 0;
            subida.sector3 = 0;
          } else if (sect === 'II') {
            subida.incidencia = incidencia[i];
            subida.sector1 = 0;
            subida.sector2 = cantidad[i];
            subida.sector3 = 0;
          } else if (sect === 'III') {
            subida.incidencia = incidencia[i];
            subida.sector1 = 0;
            subida.sector2 = 0;
            subida.sector3 = cantidad[j];
          }
          // console.log(salida);
          salida.push(subida);
        }
      }
    }    
    // console.log(salida); 
    
    var medio = this.juntar(salida);   
    return medio;
  }



  juntar(entrada: Array<ReporteModel>) {
    var i = 0;
    var k = 0;    
    var salida = [ { incidencia: null, sector1: null, sector2: null, sector3: null }];
    do {
      if(i===0){
        salida[0]=entrada[0];
        this.labeles[0] = entrada[0].incidencia;
        this.sectores1[0] = entrada[0].sector1;
        this.sectores2[0] = entrada[0].sector2;
        this.sectores3[0] = entrada[0].sector3;
        i++; 
        // k++; 
      }
      if(entrada[i].incidencia !== salida[k].incidencia){
        console.log('i'+i);
        var medio = { incidencia: null, sector1: null, sector2: null, sector3: null }
        medio.incidencia = entrada[i].incidencia;
        this.labeles.push(medio.incidencia);  
        medio.sector1 = entrada[i].sector1;
        this.sectores1.push(medio.sector1);
        medio.sector2 = entrada[i].sector2;
        this.sectores2.push(medio.sector2);
        medio.sector3 = entrada[i].sector3;
        this.sectores3.push(medio.sector3);
        salida.push(medio);
        i++; 
        k++;
      } else {
        this.sectores1[k] = salida[k].sector1 = this.mayor(entrada[i].sector1, entrada[k].sector1);
        this.sectores2[k] = salida[k].sector2 = this.mayor(entrada[i].sector2, entrada[k].sector2);
        this.sectores3[k] = salida[k].sector3 = this.mayor(entrada[i].sector3, entrada[k].sector3);
        i++;
      }
    } while (i < entrada.length);
    console.log(this.labeles);    
    this.chartDatasets = [
      { data: this.sectores1, label: 'SECTOR 1' },
      { data: this.sectores2, label: 'SECTOR 2' },
      { data: this.sectores3, label: 'SECTOR 3' }
    ];
    this.chartLabels = this.labeles;
    return salida;
  }

  mayor(a:number, b:number){
    if(a < b){
      return b;
    } else if(a>b){
      return a;
    } else {
      return a;
    }
  }

  createPDF() {
    var sTable = document.getElementById('imprimirreporte').innerHTML;
    var style = "<style>";
    style = style + "div.pageA4 {font-family: Tahoma, Geneva, Verdana, sans-serif; width: 210mm; height: 245mm;}";
    style = style + "table td , table th {padding: 3px 2px;}";
    style = style + "table thead { background: #000000;}";
    style = style + "table thead th { font-weight: bold;color: #FFFFFF;text-align: center;}";
    style = style + "table, th, td {border: solid 1px black; border-collapse: collapse;text-align: center;}";
    style = style + "table tr:nth-child(even){ background: #AFA5AD;}";
    style = style + "td.incidencia {text-align: left;}";
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
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'INCIDENCIAS.xlsx');

  }



}
export class ResultadoModel {
  data: any = [];
  result: any = [];
}

