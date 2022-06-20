import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent   {

 constructor(private gifsService: GifsService){}

 get resultados(){
   return this.gifsService.resultados
 }
}
