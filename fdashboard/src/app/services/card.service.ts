import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CardService {

  tabla = [ 
            [1, "Chat boot IA", "Se trata de un proyecto que se penso con la idea de dar un servicio de chat desantendido.",1], 
            [2, "Desarrollo Web Mobile", "Proyecto para armar un departamento de desarrollo para dispositivos móviles.",2],
            [3, "Desarrollo xx1", "Es simplemente texto de relleno.Es simplemente texto de relleno.Es simplemente texto de relleno.",3],
            [4, "Desarrollo xx2", "Es simplemente texto de relleno.Es simplemente texto de relleno.Es simplemente texto de relleno.",4],
            [5, "Desarrollo xx3", "Es simplemente texto de relleno.Es simplemente texto de relleno.Es simplemente texto de relleno.",5]
          ]

  constructor() { 

  }

}
