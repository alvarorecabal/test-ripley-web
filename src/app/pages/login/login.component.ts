import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { path } from '../../../environments/path';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  remember: boolean = false;
  data: any;

  constructor(
    private auth: AuthService,
    private router: Router) {}

  ngOnInit() {    
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.remember = true;
    }
  }

  async login(form: NgForm) {
    if (form.valid) {
      Swal.fire({ allowOutsideClick: false, text: 'Espere por favor' });
      Swal.showLoading();
      this.auth.authUser(this.usuario, path.END_POINT_CLOUD_APP_LOGIN).subscribe((resp) => {
        this.data = resp;
        this.saveIdToken(this.data.idToken);
        if (this.remember) {
          localStorage.setItem('email', this.usuario.email);
        }
        Swal.close();
        this.router.navigateByUrl('/home');
      }, (err) => {
        if (err.status == 401) {
          Swal.fire({ title: 'Error de autenticación', text: err.error.msg });
        } else {
          Swal.fire({ title: 'Error de autenticación', text: 'Problemas con servicio' });
        }
      });
    }
  }

  saveIdToken(idToken) {
    sessionStorage.setItem('token', idToken);
  }
}
