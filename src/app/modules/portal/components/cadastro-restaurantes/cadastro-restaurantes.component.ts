import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { ReceitasService } from 'src/app/core/services/receitas.service';
import { RestaurantesService } from 'src/app/core/services/restaurantes.service';
import { Receitas } from 'src/app/shared/models/Receitas';
import { Restaurantes } from 'src/app/shared/models/restaurante';

@Component({
  selector: 'app-cadastro-restaurantes',
  templateUrl: './cadastro-restaurantes.component.html',
  styleUrls: ['./cadastro-restaurantes.component.css']
})
export class CadastroRestaurantesComponent implements OnInit {


  cadastro: FormGroup = new FormGroup({
    id: new FormControl(null),
    uf: new FormControl(null, Validators.required),
    municipio: new FormControl(null,Validators.required),
    imagem: new FormControl(null),
    numero: new FormControl(null,Validators.required),
    nomeRestaurante: new FormControl(null,Validators.required),
    cep: new FormControl(null,Validators.required),
    endereco: new FormControl(null, Validators.required),
    idUsuario: new FormControl(localStorage.getItem('id')),
    dtCadastro: new FormControl(new Date().toISOString().slice(0, 10)),
  });

  atualiza: boolean = true;
  file: any = null;
  tamanho: string = '';
  erros: Array<string> = [];

  estados:Array<string> = [];
  cidades:Array<string> = [];

  //TODO: VERIFICAR O PQ DA IMAGEM NÃO ESTAR INDO

  constructor(
    private service: ReceitasService,
    private service_restaurante: RestaurantesService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.service_restaurante.getEstados().subscribe(res =>{
      this.estados = res
    })
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.id !== undefined) {
        let id = params.id;
        this.service_restaurante.getRestauranteById(id).subscribe((res) => {
          console.log(res);
          this.getCidades(res.uf)
          this.cadastro.setValue(res);
        });
      }
    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
      this.tamanho = (this.file.size / (1024 * 1024)).toFixed(2);
    }
  }

  getCidades(cidade:string){
    this.service_restaurante.getCidades(cidade).subscribe(res =>{
      this.cidades = res;
    },err =>{
      this.cidades = [];
    })
  }

  //TODO: COLOCAR O LOADING AO APERTAR O BOTÃO DE SALVAR;
  onSubmit() {
    if (this.cadastro.value.id == null) {
      let restaurante: Restaurantes = new Restaurantes(this.cadastro.value);
      if (this.file != null) {
        let file = new FormData();
        file.append('file', this.file);

        var t = this.service_restaurante.uploadImagens(file).subscribe(
          (res) => {
            if (res.isSaved) {
              this.cadastro.controls['imagem'].setValue(res.file);

              console.log(restaurante);

              this.service_restaurante.cadastrarRestaurante(restaurante).subscribe(
                (res) => {
                  console.log(res);
                  if (res.cadastrado) {
                    this.atualiza = !this.atualiza;
                    this.toastr.success(
                      'O Restaurante foi alterado com sucesso.',
                      'Oba!'
                    );
                    this.limpar();
                  } else {
                    this.toastr.error(
                      'Ocorreram erros ao cadastrar a publicação.',
                      'Erro!'
                    );
                    this.erros = res.erros;
                  }
                },
                (err) => {
                  console.log(err);
                }
              );
            }
            return res;
          },
          (err) => {}
        );
      } else {
        let restaurante: Restaurantes = new Restaurantes(this.cadastro.value);
        this.service_restaurante.cadastrarRestaurante(restaurante).subscribe(
          (res) => {
            console.log(res);
            if (res.cadastrado) {
              this.atualiza = !this.atualiza;
              this.toastr.success(
                'O Restaurante foi alterado com sucesso.',
                'Oba!'
              );
              this.limpar();
            } else {
              this.toastr.error(
                'Ocorreram erros ao cadastrar o restaurante, tente Novamente.',
                'Erro!'
              );
              this.erros = res.erros;
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    } else {
      if (this.file != null) {
        let file = new FormData();
        file.append('file', this.file);
        var t = this.service.uploadImagens(file).subscribe(
          (res) => {
            if (res.isSaved) {
              this.cadastro.controls['imagem'].setValue(res.file);
              let noticia: Restaurantes = new Restaurantes(this.cadastro.value);
              this.service_restaurante.alterarRestaurante(noticia).subscribe(
                (res) => {
                  console.log(res);
                  if (res.cadastrado) {
                    this.atualiza = !this.atualiza;
                    this.toastr.success(
                      'O Restaurante foi cadastrado com sucesso.',
                      'Oba!'
                    );
                    this.limpar();
                  } else {
                    this.toastr.error(
                      'Ocorreram erros ao cadastrar a publicação.',
                      'Erro!'
                    );
                    this.erros = res.erros;
                  }
                },
                (err) => {
                  console.log(err);
                }
              );
            }
            return res;
          },
          (err) => {}
        );
      } else {
        let noticia: Restaurantes = new Restaurantes(this.cadastro.value);
        console.log(noticia);
        this.service_restaurante.alterarRestaurante(noticia).subscribe(
          (res) => {
            console.log(res);
            if (res.cadastrado) {
              this.atualiza = !this.atualiza;
              this.toastr.success(
                'O Restaurante foi alterado com sucesso.',
                'Oba!'
              );
              this.limpar();
            } else {
              this.toastr.error(
                'Ocorreram erros ao cadastrar a publicação.',
                'Erro!'
              );
              this.erros = res.erros;
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
  }

  limpar() {
    this.cadastro = new FormGroup({
      id: new FormControl(null),
      uf: new FormControl(null, Validators.required),
      municipio: new FormControl('0'),
      imagem: new FormControl(null),
      numero: new FormControl(null),
      nomeRestaurante: new FormControl(null),
      cep: new FormControl(null),
      endereco: new FormControl(null, Validators.required),
      idUsuario: new FormControl(localStorage.getItem('id')),
      dtCadastro: new FormControl(new Date().toISOString().slice(0, 10)),
    });
  }
}
