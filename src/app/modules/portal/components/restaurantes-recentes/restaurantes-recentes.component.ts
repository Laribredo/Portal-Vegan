import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AgmMap, MouseEvent, MapsAPILoader } from '@agm/core';
import { RestaurantesService } from 'src/app/core/services/restaurantes.service';
import { MapsService } from 'src/app/core/services/maps.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restaurantes-recentes',
  templateUrl: './restaurantes-recentes.component.html',
  styleUrls: ['./restaurantes-recentes.component.css'],
})
export class RestaurantesRecentesComponent implements OnInit {

  lat: any;
  lng: any;
  getAddress: any;
  zoom: any;
  latitude: number;
  longitude: number;
  ruaAtual: string = "";
  cidadeAtual:string = "";
  restaurantes:Array<any> = [];
  restaurante_show:Array<any> = [];
  error:boolean = false;
  voto:number = 0;
  estados:Array<string> = [];
  cidades:Array<string> = [];

  constructor(private service:RestaurantesService, private apiloader: MapsAPILoader,  private toastr: ToastrService,){}

  ngOnInit(): void {
    this.service.getEstados().subscribe(res =>{
      this.estados = res
    })

    this.get();
    setTimeout(() => {
      this.getCidade();
      setTimeout(() => {
        console.log(this.restaurante_show);

      }, 1000);
    }, 2000);
  }


  getCidades(cidade:string){
    this.service.getCidades(cidade).subscribe(res =>{
      this.cidades = res;
    },err =>{
      this.cidades = [];
    })
  }

  selecionaCidade(cidade:string){
    this.cidadeAtual = cidade;
  }

  selecionaBairro(bairro:string)
  {
    this.ruaAtual = bairro;
    this.error = false;
    this.getCidade();
  }


  public getDistancia(origen: string, destino: Array<string>) {
    return new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': [origen], 'destinations': destino ,travelMode:google.maps.TravelMode.DRIVING}, (results: any) => {
      console.log(results.rows[0].elements);
      console.log(results);
      results.rows[0].elements.map((t,j) =>{
        console.log(t);
        if(t != undefined)
        this.restaurante_show.push(t.distance.text);
        //this.restaurantes[j].distancia = t.distance.text;
      })
      return;
    });
}

  getLatAndLang(endereco:string){
    return new google.maps.Geocoder().geocode({address:endereco},(res) =>{
      console.log(res);
    })
  }

  getCidade(){
    this.service.getRestaurante(this.cidadeAtual).subscribe(res=>{
      this.restaurantes = res;
      let enderecoDestino:Array<string> = [ ];
      this.restaurantes.map((rest,i) =>{
        enderecoDestino.push(rest.endereco + "," +rest.municipio);
      })

      this.getDistancia(this.ruaAtual+","+this.cidadeAtual, enderecoDestino);
      return true;
    },err =>{

    })
  }


  votar(numb:number,i)
  {
    console.log(this.restaurantes[i].voto);

    if(this.restaurantes[i].voto  == null)
    {
      let objAvaliar = {
        idRestaurante:this.restaurantes[i].id,
        idUsuario:localStorage.getItem("id"),
        dtAvaliacao:new Date(),
        nota:numb
      }
      this.restaurantes[i].voto = numb;
      this.service.avaliarRestaurante(objAvaliar).subscribe(res =>{
        this.toastr.success("Avaliação feita com sucesso.","Oba!")
      },err =>{
        this.toastr.error("Ocorreu um erro ao efetuar a avaliação","Ops!")
      })
    }
  }

  get() {
    let liberado = false;
    if (navigator.geolocation) {
      liberado = true;
      navigator.geolocation.getCurrentPosition((position: any) => {
        console.log(position);
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.getAddress = (this.lat, this.lng);
          this.apiloader.load().then(() => {
            let geocoder = new google.maps.Geocoder();
            let latlng = {
              lat: this.lat,
              lng: this.lng,
            };
            geocoder.geocode(
              {
                location: latlng,
              },
              (results) => {
                if (results[0]) {

                  console.log(results[0]);

                  this.cidadeAtual = results[0].address_components[4].long_name;
                  this.ruaAtual = results[0].address_components[2].long_name;
                } else {
                  console.log('Not found');
                }
              }
            );
          });
        }
      },(err) =>{
        this.toastr.error("Libere a Localização do seu navegador acima","Atenção")
        this.error = true;
      });
    }
  }
}
