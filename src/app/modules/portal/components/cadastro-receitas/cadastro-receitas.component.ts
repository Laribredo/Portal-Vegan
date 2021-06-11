import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { publicacaoProvider } from 'src/app/core/services/publicacao.provider';
import { ReceitasService } from 'src/app/core/services/receitas.service';
import { Receitas } from 'src/app/shared/models/Receitas';

@Component({
  selector: 'app-cadastro-receitas',
  templateUrl: './cadastro-receitas.component.html',
  styleUrls: ['./cadastro-receitas.component.css'],
})
export class CadastroReceitasComponent implements OnInit {
  cadastro: FormGroup = new FormGroup({
    id: new FormControl(null),
    titulo: new FormControl(null, Validators.required),
    receita: new FormControl('0'),
    imagem: new FormControl(null),
    conteudo: new FormControl(null, Validators.required),
    idUsuario: new FormControl(localStorage.getItem('id')),
    dtCriacao: new FormControl(new Date().toISOString().slice(0, 10)),
  });

  atualiza: boolean = true;
  file: any = null;
  tamanho: string = '';
  erros: Array<string> = [];

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '250px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    //uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
      this.tamanho = (this.file.size / (1024 * 1024)).toFixed(2);
    }
  }

  constructor(
    private service: ReceitasService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.id !== undefined) {
        let id = params.id;
        this.service.getReceitaById(id).subscribe((res) => {
          console.log(res);
          this.cadastro.setValue(res);
        });
      }
    });
  }

  //TODO: COLOCAR O LOADING AO APERTAR O BOTÃO DE SALVAR;

  onSubmit() {
    if (this.cadastro.value.id == null) {
      if (this.file != null) {
        let file = new FormData();
        file.append('file', this.file);

        var t = this.service.uploadImagens(file).subscribe(
          (res) => {
            if (res.isSaved) {
              this.cadastro.controls['imagem'].setValue(res.file);
              let receita: Receitas = new Receitas(this.cadastro.value);
              console.log(receita);

              this.service.cadastrarReceita(receita).subscribe(
                (res) => {
                  console.log(res);
                  if (res.cadastrado) {
                    this.atualiza = !this.atualiza;
                    this.toastr.success(
                      'A Receita foi cadastrada com sucesso.',
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
        let noticia: Receitas = new Receitas(this.cadastro.value);
        this.service.cadastrarReceita(noticia).subscribe(
          (res) => {
            console.log(res);
            if (res.cadastrado) {
              this.atualiza = !this.atualiza;
              this.toastr.success(
                'A Receita foi cadastrada com sucesso.',
                'Oba!'
              );
              this.limpar();
            } else {
              this.toastr.error(
                'Ocorreram erros ao cadastrar a receita, tente Novamente.',
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
              let noticia: Receitas = new Receitas(this.cadastro.value);
              this.service.alterarReceita(noticia).subscribe(
                (res) => {
                  console.log(res);
                  if (res.cadastrado) {
                    this.atualiza = !this.atualiza;
                    this.toastr.success(
                      'A Receita foi cadastrada com sucesso.',
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
        let noticia: Receitas = new Receitas(this.cadastro.value);
        console.log(noticia);
        this.service.alterarReceita(noticia).subscribe(
          (res) => {
            console.log(res);
            if (res.cadastrado) {
              this.atualiza = !this.atualiza;
              this.toastr.success(
                'A Receita foi alterada com sucesso.',
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
      titulo: new FormControl(null, Validators.required),
      receita: new FormControl('0'),
      imagem: new FormControl(null),
      conteudo: new FormControl(null, Validators.required),
      usuario: new FormControl(localStorage.getItem('id')),
      dtCadastro: new FormControl(new Date().toISOString().slice(0, 10)),
    });
  }
}
