
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractWords',
})
export class ExtractWords implements PipeTransform {
  transform(value: string, extractCount:number = 2): string | boolean
  {
    let arrayNome;
    if (value === null) {return false;}    
    if(value.split(' ').length === 1){return value;}
    if(value.split(' ').length > extractCount){
      arrayNome = value.split(' ')
      arrayNome = arrayNome.splice(0,value.length - 1)    
    }
    arrayNome = value.split(' ')
    arrayNome = arrayNome.splice(0,extractCount)        
    return arrayNome.toString().replace(/,/g,' ');
  }
}


