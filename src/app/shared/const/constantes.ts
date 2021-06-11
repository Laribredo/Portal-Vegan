
export const API_LOCAL = "http://localhost:64845/api";



export const SALVA_TOKEN = (token =>{
  localStorage.setItem("token", token);
})

export const SALVA_NOME = (nome =>{
  localStorage.setItem("nome", nome);
})

export const SALVA_ID = (id =>{
  localStorage.setItem("id", id);
})

export const SALVA_APELIDO = (apelido =>{
  localStorage.setItem("apelido", apelido);
})

export const GET_ID = localStorage.getItem("id");

export const GET_APELIDO = localStorage.getItem("apelido");

export const REPO_IMAGENS = "http://localhost/Imagens/";


export const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
