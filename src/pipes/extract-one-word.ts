
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MensagemReduzidaPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'extractOneWord',
})
export class ExtractOneWord implements PipeTransform {
  transform(value: string, args: any[]): string | boolean
  {
    if (value === null) {return false;}
    return `${value.split(' ')[0]}`;
  }
}


