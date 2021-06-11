import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SALVA_APELIDO, SALVA_ID, SALVA_TOKEN } from 'src/app/shared/const/constantes';
import { usuarioProvider } from 'src/app/core/services/usuario.provider';

@Component({
  selector: 'app-login-area',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginAreaComponent implements OnInit {

  constructor(private service:usuarioProvider, private route:Router) { }

  loading:boolean = false;
  error:Error = null;
  login: FormGroup = new FormGroup({
    'login': new FormControl(null, Validators.required),
    'senha': new FormControl(null, Validators.required)
  });

  ngOnInit(): void {

  }

  onSubmit(){
    if(this.login.valid){
      this.loading = true;
      this.service.Login(this.login.value).subscribe(res =>{
        console.log(res);
        this.loading = false;
        SALVA_TOKEN(res.token_);
        SALVA_ID(res.usuario.id);
        SALVA_APELIDO(res.usuario.apelido);
        this.route.navigate(['portal/noticias-recentes']);
      },err =>{
        this.loading = false;
        this.error = err;
      })
    }
  }

}
