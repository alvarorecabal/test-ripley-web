import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../service/auth.service';
import { path } from '../../../environments/path';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  remember: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {

    if(form.valid) {
      Swal.fire({ allowOutsideClick: false, text: 'Espere por favor' });
      Swal.showLoading();
      this.auth.authUser(this.usuario, path.END_POINT_CLOUD_APP_CREATE_USER).subscribe((resp) => {
        Swal.close();
        if(this.remember) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/login');
      }, (err) => {
        if(err.status == 400) {
          Swal.fire({ title: 'Error Crear Usuario', text: err.error.msg });
        } else {
          Swal.fire({ title: 'Error de autenticación', text: 'Problemas con servicio' });
        }
      });
    }
  }


}
