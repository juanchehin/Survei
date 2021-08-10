import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/service/persona.service';
import { PersonaModel, UsuariModel, RolModel, SelectModel } from '../../../model/persona.model';
import { map } from 'rxjs/operators';

declare var swal: any;
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  validatingForm: FormGroup;
  usuarioForm: FormGroup;
  Personas: PersonaModel[];
  newUsuario = new UsuariModel();
  salida : any = [ 
    { value: 1, label: 'Option 1' }  
  ];

  pagina2: number = 1;
  term = '';
  cargos = [
    { value: 'SEGURIDAD', label: 'JEFE DE SEGURIDAD' },
    { value: 'GRUPO', label: 'JEFE DE GRUPO' },
    { value: 'CAMARA', label: 'JEFE DE MONITOR' },
    { value: 'MONITOR', label: 'MONITOR' },
    { value: 'SERENO', label: 'SEGURIDAD' },

  ];
  roles = new Array<SelectModel>();
  constructor(
    private _router: Router,
    private _personaSrv: PersonaService
  ) {
  }
  ngOnInit() {
    this.validatingForm = new FormGroup({
      apellido: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      cargo: new FormControl('', Validators.required),
      dni: new FormControl('', [Validators.minLength(8), Validators.maxLength(8), Validators.required]),
    });
    this.usuarioForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      idrole: new FormControl('', Validators.required),

    });
    this.ListarUsuarios();
    this.listarRol();
  }
  crearInscripcion(persona: any) {
    console.log(persona);

    this._personaSrv.SaveOrUpdatePersona(persona).subscribe((res: any) => {
      console.log(res);
      if(res.code === 200){
        swal('Bien!', 'PERSONAL CREADO!', 'success'); 
        this.ListarUsuarios();
        this.validatingForm.reset()       
     } else {
        swal('MAL!', 'PERSONAL NO CREADO', 'warning');
     }
    });
  }
  crearUsuario(usuario: any, basicmodel17) {
    usuario.idempleado = this.newUsuario.idusuaio;
    console.log(usuario);
      
    this._personaSrv.SaveOrUpdateUsuario(usuario).subscribe((res: any) => {
      console.log(res);
      if(res.code === 200){
         swal('Bien!', 'USUARIO CREADO!', 'success');
         basicmodel17.hide();
      } else {
         swal('MAL!', 'USUARIO NO CREADO', 'warning');
      }
    })
  }
  ListarUsuarios() {
    this._personaSrv.getListarPersona().subscribe((res: any) => {      
      // console.log(res);
      this.Personas = res.data;
    })
  }
  listarRol() {
    this._personaSrv.getListarrol()
    .pipe(
      map( (res:any) => {
        for (let i = 0; i < res.data.length; i++) {      
          if(i === 0) {
            this.salida[0].value = res.data[0].idrol;
            this.salida[0].label = res.data[0].descripcionrol;        
          } else {
            var value = res.data[i].idrol
            var label = res.data[i].descripcionrol
            var cargar = {value,label}
            this.salida.push(cargar);
          }    
        }
        return this.salida;
      })).subscribe((res: any) => {
      this.roles = res;
    }
    )
  }

  iniciarUsuario(basicmodel17, item: PersonaModel) {
    basicmodel17.show();
    console.log(item);
    this.newUsuario.idusuaio = item.idpersona;
  }

  get apellido() {
    return this.validatingForm.get('apellido');
  }
  get cargo() {
    return this.validatingForm.get('cargo');
  }
  get nombre() {
    return this.validatingForm.get('nombre');
  }
  get dni() {
    return this.validatingForm.get('dni');
  }
  get username() {
    return this.usuarioForm.get('username');
  }

  get password() {
    return this.usuarioForm.get('password');
  }
  get rol() {
    return this.usuarioForm.get('rol');
  }

}
