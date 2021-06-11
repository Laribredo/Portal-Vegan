import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Noticias } from 'src/app/shared/models/Noticias';
import { publicacaoProvider } from 'src/app/core/services/publicacao.provider';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-noticias',
  templateUrl: './cadastro-noticias.component.html',
  styleUrls: ['./cadastro-noticias.component.css'],
})
export class CadastroNoticiasComponent implements OnInit {
  cadastro: FormGroup = new FormGroup({
    id: new FormControl(null),
    titulo: new FormControl(null, Validators.required),
    imagem: new FormControl(null),
    conteudo: new FormControl(null, Validators.required),
    usuario: new FormControl(localStorage.getItem('id')),
    dtCadastro: new FormControl(new Date().toISOString().slice(0, 10)),
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
    private service: publicacaoProvider,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.id !== undefined) {
        let id = params.id;
        this.service.getNoticiasById(id).subscribe((res) => {
          this.cadastro.setValue(res);
        });
      }
    });
  }

  limpar() {
    this.cadastro = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      imagem: new FormControl(null),
      conteudo: new FormControl(null, Validators.required),
      usuario: new FormControl(localStorage.getItem('id')),
      dtCadastro: new FormControl(new Date().toISOString().slice(0, 10)),
    });
  }

  onSubmit() {
    if (this.cadastro.value.id == null) {
      if (this.file != null) {
        let file = new FormData();
        file.append('file', this.file);

        var t = this.service.uploadImagens(file).subscribe(
          (res) => {
            if (res.isSaved) {
              this.cadastro.controls['imagem'].setValue(res.file);
              let noticia: Noticias = new Noticias(this.cadastro.value);
              this.service.cadastrarNoticia(noticia).subscribe(
                (res) => {
                  console.log(res);
                  if (res.cadastrado) {
                    this.atualiza = !this.atualiza;
                    this.toastr.success(
                      'A Publicação foi cadastrada com sucesso.',
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
        let noticia: Noticias = new Noticias(this.cadastro.value);
        this.service.cadastrarNoticia(noticia).subscribe(
          (res) => {
            console.log(res);
            if (res.cadastrado) {
              this.atualiza = !this.atualiza;
              this.toastr.success(
                'A Publicação foi cadastrada com sucesso.',
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
    }else{
      if (this.file != null) {
        let file = new FormData();
        file.append('file', this.file);

        var t = this.service.uploadImagens(file).subscribe(
          (res) => {
            if (res.isSaved) {
              this.cadastro.controls['imagem'].setValue(res.file);
              let noticia: Noticias = new Noticias(this.cadastro.value);
              this.service.alterarNoticia(noticia).subscribe(
                (res) => {
                  console.log(res);
                  if (res.cadastrado) {
                    this.atualiza = !this.atualiza;
                    this.toastr.success(
                      'A Publicação foi cadastrada com sucesso.',
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
        let noticia: Noticias = new Noticias(this.cadastro.value);
        console.log(noticia);

        this.service.alterarNoticia(noticia).subscribe(
          (res) => {
            console.log(res);
            if (res.cadastrado) {
              this.atualiza = !this.atualiza;
              this.toastr.success(
                'A Publicação foi alterada com sucesso.',
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
}
