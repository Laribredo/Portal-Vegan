import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/models/Usuario';
import { usuarioProvider } from 'src/app/core/services/usuario.provider';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  erros:Array<string> = [];
  loading:boolean = false;

  cadastro:FormGroup = new  FormGroup({
    'nome': new FormControl(null, Validators.required),
    'email': new FormControl(null, Validators.required),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'dataNascimento': new FormControl(null, Validators.required),
    'cpf': new FormControl(null, Validators.required),
    'apelido': new FormControl(null, [Validators.required,Validators.minLength(3)]),
  });

  constructor(private service: usuarioProvider) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.cadastro.valid)
    {
      let usuario:Usuario = new Usuario(this.cadastro.value);
      this.loading = true;
      this.service.Cadastrar(usuario).subscribe(res =>{
        console.log(res);
        this.loading = false;
        if(!res.cadastrado)
          this.erros = res.erros
        else{
          this.erros = [];
          alert("Você foi cadastrado com sucesso, agora tente efetuar o login.");
        }
      },err =>{
        console.log(err);
        this.erros = [];
        this.erros.push("Ocorreu um erro de Comunicação, Por Favor tente novamente.");
        this.loading = false;
      })
    }
  }

}
