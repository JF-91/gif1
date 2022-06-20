import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Gif, SearchGifsResponse} from '../../gifs/interfaces/gifs.interfaces'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl = 'http://api.giphy.com/v1/gifs'
  private apikey     : string = 'bLcs28DXTnVeM2oVy3ub8bV1NKgFhfKR'

  private _historial : string[] = []

  //guarda los resultados de la respuesta de la api
  public resultados : Gif[] = []
  
  get historial(){
    
    return [...this._historial]
  }

  constructor(private http: HttpClient){
    /*
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial') !) ;
    }
    */
   this._historial = JSON.parse(localStorage.getItem('historial') !) || [];
   this._historial = JSON.parse(localStorage.getItem('resultados') !) || [];
   
  }

 

  buscarGif(query: string = ''){

    // esto hace que todas las consultas se capitalicen 
    query = query.trim().toUpperCase();

    //esto hace que si el elemento existe en la lista no se vuelva a insertar. include es como un contain de java
    if(!this._historial.includes(query)){
      this._historial.unshift(query)
    }

    //esto limita que solo 10 elementos se agregen a la lista
    this._historial = this._historial.splice(0,10)

    //local storage de la web
    localStorage.setItem('historial', JSON.stringify(this._historial))
    

    //params
    const params = new HttpParams()
      .set('api_key', this.apikey)
      //siempre tiene que estar el number en string
      .set('limit', '10')
      .set('q', query);




    //suscribe es parecido al then, se va a ejecutar cuando tengas la respupesta del get
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe( ( resp: SearchGifsResponse)=>{
        console.log(resp.data);
        this.resultados = resp.data

        //grabar imagenes en localstorage
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })
  }

 
 
  
}
