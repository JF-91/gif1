import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent  {

  //es parecido a un queryselector
  @ViewChild('txtBuscar') txtBuscar !: ElementRef;

  constructor(private gifservice: GifsService){}
  
  buscar(){
   
    const valor = this.txtBuscar.nativeElement.value
    
    if(valor.trim().lengt == 0)
    {
      return;
    }


    this.gifservice.buscarGif(valor)
    
    this.txtBuscar.nativeElement.value = '';
    
  }

}
