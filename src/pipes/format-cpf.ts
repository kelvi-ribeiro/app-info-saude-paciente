
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MensagemReduzidaPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatCpf',
})
export class FormatCpf implements PipeTransform {
  DECIMAL_SEPARATOR=".";
  GROUP_SEPARATOR=",";

  transform(value: string, args: any[]): string | boolean
  {
    if (value === null) {return false;}
    return this.formatCpf(value);
  }

  formatCpf(valString) {
    if (!valString) {
        return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    val = parts;
    if(parts[0].length <= 11){
      valString = this.cpf_mask(parts[0]);      
      return valString;
    }else{
      return valString;
    }
  }

  cpf_mask(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
    }

    unFormat(val) {
      if (!val) {
          return '';
      }
      val = val.replace(/\D/g, '');
  
      if (this.GROUP_SEPARATOR === ',') {
          return val.replace(/,/g, '');
      } else {
          return val.replace(/\./g, '');
      }
    }

  
}


